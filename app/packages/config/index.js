// @flow
import { MockDiscovery, MockTransport, DelayTransform } from '@electricui/mock-device'

import { BinaryProtocolDecoder, BinaryProtocolEncoder } from '@electricui/protocol-binary'

import { SerialTransport, SerialDiscovery } from '@electricui/transport-node-serial'

import { WebSocketTransport, WebSocketDiscovery } from '@electricui/transport-node-websocket'

import { NodeUSBDiscovery } from '@electricui/discovery-node-usb'

import { DeveloperDiscovery } from '@electricui/discovery-developer'

import {
  TypeTransform,
  defaultDecoderList,
  defaultEncoderList
} from '@electricui/protocol-type-transforms'

import { LargePacketEncoder, LargePacketDecoder } from '@electricui/protocol-large-transfers'

// we have to do dependency injection with native dependencies
import SerialPort from 'serialport'
import WebSocket from 'isomorphic-ws'
import usb from 'usb'

import DeviceManager from '@electricui/core-device-manager'

import { PassThrough } from 'stream'

import { colorEncoder, colorDecoder } from './customtypes'

// have a type cache that's global
const typeCache = {}

const wsFactory = options => {
  // setup the ws transport, binary encoder and decoder
  const eventInterface = new PassThrough({ objectMode: true })

  const wsTransport = new WebSocketTransport(options)
  const wsDecoder = new BinaryProtocolDecoder({ typeCache, eventInterface })
  const wsEncoder = new BinaryProtocolEncoder()

  // pipe the typeCache from the decoder above into the type encoder below
  const wsTypeDecoder = new TypeTransform()
  const wsTypeEncoder = new TypeTransform({ typeCache })

  // setup the type transforms to use the default type ID <-> binary formats
  wsTypeDecoder.use(defaultDecoderList)
  wsTypeEncoder.use(defaultEncoderList)

  // the interfaces we use to read and write to ws
  const wsReadInterface = wsTransport.readInterface.pipe(wsDecoder).pipe(wsTypeDecoder)

  const wsWriteInterface = wsTypeEncoder
  wsTypeEncoder.pipe(wsEncoder).pipe(wsTransport.writeInterface)

  return {
    // the transport handles connecting and disconnecting to individual devices
    transport: wsTransport,

    // these read and write interfaces allow for communication with the device
    readInterface: wsReadInterface,
    writeInterface: wsWriteInterface,

    eventInterface
  }
}

const wsConfiguration = {
  WebSocket
}

const dummyFactory = options => {
  // we connect to the device with the ID requested
  const idRequested = options.idRequested || 0

  const eventInterface = new PassThrough({ objectMode: true })

  const mockTransport = new MockTransport({
    idRequested,
    delay: options.delay
  })

  // we want to run all packets through a binary encoder and decoder
  const writeEncoder = new BinaryProtocolEncoder()
  const writeDecoder = new BinaryProtocolDecoder({ eventInterface })

  const readEncoder = new BinaryProtocolEncoder()
  const readDecoder = new BinaryProtocolDecoder({ typeCache, eventInterface })

  // pipe the typeCache from the decoder above into the type encoder below
  const typeEncoder = new TypeTransform({ typeCache })
  const typeDecoder = new TypeTransform()
  const hardwareTypeDecoder = new TypeTransform()
  const hardwareTypeEncoder = new TypeTransform({ typeCache })

  // setup the type transforms to use the default type ID <-> binary formats
  typeEncoder.use(defaultEncoderList)
  typeDecoder.use(defaultDecoderList)
  hardwareTypeEncoder.use(defaultEncoderList)
  hardwareTypeDecoder.use(defaultDecoderList)

  // setup our custom color transforms as well (this takes a list)
  typeEncoder.use([colorEncoder])
  typeDecoder.use([colorDecoder])
  hardwareTypeEncoder.use([colorEncoder])
  hardwareTypeDecoder.use([colorDecoder])

  let readInterface = mockTransport.interface
    .pipe(hardwareTypeEncoder)
    .pipe(readEncoder)
    .pipe(readDecoder)
    .pipe(typeDecoder)

  if (options.delay) {
    const delayTransform = new DelayTransform({ delay: options.delay })
    readInterface = mockTransport.interface.pipe(delayTransform)
  }

  // we write into the typeEncoder
  const writeInterface = typeEncoder

  typeEncoder
    .pipe(writeEncoder)
    .pipe(writeDecoder)
    .pipe(hardwareTypeDecoder)
    .pipe(mockTransport.interface)

  return {
    // the transport handles connecting and disconnecting to individual devices
    transport: mockTransport,

    // these read and write interfaces allow for communication with the device
    readInterface,
    writeInterface,

    eventInterface
  }
}

const serialConfiguration = {
  baudRate: 115200,
  filter: ({ manufacturer }) => {
    if (manufacturer && manufacturer.includes('Arduino')) {
      return true
    }
    return false
  },
  SerialPort
}

const serialFactory = options => {
  // setup the passthrough stream for events
  const eventInterface = new PassThrough({ objectMode: true })

  // setup the serial transport with our options, plus the event interface
  const serialTransport = new SerialTransport(Object.assign({}, options, { eventInterface }))

  // setup our binary protocol encoder and decoder
  const serialEncoder = new BinaryProtocolEncoder()
  const serialDecoder = new BinaryProtocolDecoder({ typeCache, eventInterface })

  // pipe the typeCache from the decoder above into the type encoder below
  const serialTypeEncoder = new TypeTransform({ typeCache })
  const serialTypeDecoder = new TypeTransform()

  // setup the type transforms to use the default type ID <-> binary formats
  serialTypeEncoder.use(defaultEncoderList)
  serialTypeDecoder.use(defaultDecoderList)

  // setup the custom transforms
  serialTypeEncoder.use([colorEncoder])
  serialTypeDecoder.use([colorDecoder])

  // our recursive loopback interface is accessible at options.deviceManagerWriteInterface

  // Our large packet encoder and decoder
  // we specify our maxPacketLength here
  const largePacketEncoder = new LargePacketEncoder({
    eventInterface,
    writeInterface: options.deviceManagerWriteInterface, // the recursive functionality
    maxPacketLength: 100 // 100 bytes per packet, despite being able to do 1024
  })

  const largePacketDecoder = new LargePacketDecoder({ eventInterface })

  // the interfaces we use to read and write to serial
  const serialReadInterface = serialTransport.interface
    .pipe(serialDecoder)
    .pipe(largePacketDecoder)
    .pipe(serialTypeDecoder)

  // writing to serial, mirrors the above
  serialTypeEncoder
    .pipe(largePacketEncoder)
    .pipe(serialEncoder)
    .pipe(serialTransport.interface)

  const serialWriteInterface = serialTypeEncoder
  /*
  serialEncoder.on('data', d => {
    console.log(
      'writing',
      d
        .toString('hex')
        .replace(/(.{2})/g, '$1 ')
        .trim()
    )
  })

  serialTransport.interface.on('data', d => {
    console.log(
      'direct read',
      d
        .toString('hex')
        .replace(/(.{2})/g, '$1 ')
        .trim()
    )
  })

  serialWriteInterface.on('data', d => {
    console.log('high level write', d)
  })

  serialReadInterface.on('data', d => {
    console.log('parsed read', d)
  })
*/
  return {
    // the transport handles connecting and disconnecting to individual devices
    transport: serialTransport,

    // these read and write interfaces allow for communication with the device
    readInterface: serialReadInterface,
    writeInterface: serialWriteInterface,

    eventInterface
  }
}

const discovery = [
  new MockDiscovery({
    ids: ['fridge', 'oven'],
    transportKey: 'lightning'
  }),
  new MockDiscovery({
    ids: ['fridge', 'kettle'],
    transportKey: 'mail'
  }),
  new SerialDiscovery({
    factory: serialFactory,
    configuration: serialConfiguration
  }),
  new WebSocketDiscovery({
    factory: wsFactory,
    configuration: wsConfiguration
  }),
  new NodeUSBDiscovery({ usb }),
  new DeveloperDiscovery({
    transportKey: 'websocket',
    hints: [
      //  {
      //    uri: 'ws://10.69.186.174:9998'
      //  }
    ]
  })
]

/*
  Generate the transports object
*/

const transports = {
  lightning: {
    factory: dummyFactory,
    configuration: {
      transportKey: 'lightning'
    }
  },
  mail: {
    factory: dummyFactory,
    configuration: {
      transportKey: 'mail',
      delay: 200
    }
  },
  serial: {
    factory: serialFactory,
    configuration: serialConfiguration
  },
  websocket: {
    factory: wsFactory,
    configuration: wsConfiguration
  }
}

/*
  Our Device Manager
*/

const manager = new DeviceManager({
  transports,
  discovery
})

export { manager, transports, discovery }
