import {
  Codec,
  CodecDuplexPipeline,
  ConnectionInterface,
  ConnectionStaticMetadataReporter,
  DiscoveryHintConsumer,
  Hint,
  Message,
  PushCallback,
  TransportFactory,
  TypeCache,
} from '@electricui/core'
import {
  BinaryPipeline,
  BinaryTypeCachePipeline,
  DeliverabilityManagerBinaryProtocol,
  QueryManagerBinaryProtocol,
} from '@electricui/protocol-binary'
import { COBSPipeline } from '@electricui/protocol-binary-cobs'
import { defaultCodecList } from '@electricui/protocol-binary-codecs'
import { HeartbeatConnectionMetadataReporter } from '@electricui/protocol-binary-heartbeats'
import {
  SerialPortHintProducer,
  SerialPortHintTransformer,
  SerialTransport,
} from '@electricui/transport-node-serial'
import { USBHintProducer } from '@electricui/transport-node-usb-discovery'

const typeCache = new TypeCache()

const SerialPort = require('serialport')

const USB = require('@electricui/node-usb')

const serialProducer = new SerialPortHintProducer({
  SerialPort,
  baudRate: 115200,
})

const usbProducer = new USBHintProducer({
  USB,
  attachmentDelay: 500,
})

// Serial Ports
const serialTransportFactory = new TransportFactory(options => {
  const connectionInterface = new ConnectionInterface()

  const transport = new SerialTransport(options)

  const deliverabilityManager = new DeliverabilityManagerBinaryProtocol({
    connectionInterface,
    timeout: 1000,
  })

  const queryManager = new QueryManagerBinaryProtocol({
    connectionInterface,
    timeout: 1000,
  })

  const cobsPipeline = new COBSPipeline()
  const binaryPipeline = new BinaryPipeline()
  const typeCachePipeline = new BinaryTypeCachePipeline(typeCache)

  const codecPipeline = new CodecDuplexPipeline()
  codecPipeline.addCodecs(defaultCodecList)

  const connectionStaticMetadata = new ConnectionStaticMetadataReporter({
    name: 'Serial',
    baudRate: options.baudRate,
  })

  const heartbeatMetadata = new HeartbeatConnectionMetadataReporter({
    interval: 500,
    timeout: 1000,
    // measurePipeline: true,
  })

  connectionInterface.setTransport(transport)
  connectionInterface.setQueryManager(queryManager)
  connectionInterface.setDeliverabilityManager(deliverabilityManager)
  connectionInterface.setPipelines([
    cobsPipeline,
    binaryPipeline,
    codecPipeline,
    typeCachePipeline,
  ])
  connectionInterface.addMetadataReporters([
    connectionStaticMetadata,
    heartbeatMetadata,
  ])

  connectionInterface.finalise()

  return connectionInterface
})

const serialConsumer = new DiscoveryHintConsumer({
  factory: serialTransportFactory,
  canConsume: (hint: Hint) => {
    if (hint.getTransportKey() === 'serial') {
      const identification = hint.getIdentification()

      // TODO: Write docs to explain that this is a good spot to
      // define which serial ports you want to attempt connection with

      return true

      /*
      return (
        identification.manufacturer && (
          identification.manufacturer.includes('Arduino') ||
          identification.manufacturer.includes('Silicon'))
      )
      */
    }
    return false
  },
  configure: (hint: Hint) => {
    const identification = hint.getIdentification()
    const configuration = hint.getConfiguration()

    return {
      SerialPort,
      comPath: identification.comPath,
      baudRate: configuration.baudRate,
    }
  },
})

const usbToSerialTransformer = new SerialPortHintTransformer({
  producer: serialProducer,
})

export { serialConsumer, serialProducer, usbProducer, usbToSerialTransformer }
