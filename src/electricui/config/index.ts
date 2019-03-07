import {
  Connection,
  ConnectionMetadataRatio,
  ConnectionMetadataRule,
  Device,
  DeviceManager,
  Hint,
  MessageRouterLogRatioMetadata,
} from '@electricui/core'
import { HintValidatorBinaryHandshake } from '@electricui/protocol-binary'
import { BinaryConnectionHandshake } from '@electricui/protocol-binary-connection-handshake'
import { MessageQueueBinaryFIFO } from '@electricui/protocol-binary-fifo-queue'

import { ProcessName, RequestName } from './metadata'
import { serialConsumer, serialProducer, usbProducer, usbToSerialTransformer } from './serial'

const deviceManager = new DeviceManager()

function createRouter(device: Device) {
  return new MessageRouterLogRatioMetadata({ device, reportRankings: true })
}
function createQueue(device: Device) {
  return new MessageQueueBinaryFIFO({
    device,
    interval: 10,
    concurrentMessages: 100,
  })
}

function hintValidators(hint: Hint, connection: Connection) {
  const identification = hint.getIdentification()

  // Serial
  if (hint.getTransportKey() === 'serial') {
    const validator = new HintValidatorBinaryHandshake(hint, connection, 2000) // 2 second timeout

    return [validator]
  }

  return []
}

function createHandshakes(device: Device) {
  const connectionHandshakeReadWrite = new BinaryConnectionHandshake({
    device: device,
    preset: 'default',
  })

  return [connectionHandshakeReadWrite]
}

const requestName = new RequestName()
const processName = new ProcessName()

deviceManager.setCreateHintValidatorsCallback(hintValidators)
deviceManager.addHintProducers([serialProducer, usbProducer])
deviceManager.addHintConsumers([serialConsumer])
deviceManager.addHintTransformers([usbToSerialTransformer])
deviceManager.addDeviceMetadataRequesters([requestName])
deviceManager.addDiscoveryMetadataProcessors([processName])
deviceManager.setCreateRouterCallback(createRouter)
deviceManager.setCreateQueueCallback(createQueue)
deviceManager.setCreateHandshakesCallback(createHandshakes)

deviceManager.addConnectionMetadataRatios([
  new ConnectionMetadataRatio('latency', false, 1),
  new ConnectionMetadataRatio('jitter', false, 0.1),
  new ConnectionMetadataRatio('packetLoss', false, 2),
])

deviceManager.addConnectionMetadataRules([
  new ConnectionMetadataRule(['latency'], ({ latency }) => latency < 400),
  new ConnectionMetadataRule(
    ['packetLoss'],
    ({ packetLoss }) => packetLoss <= 0.2,
  ),
])

// start polling immediately!
deviceManager.poll()

export default deviceManager
