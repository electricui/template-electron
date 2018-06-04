import {
  EVENT_DEVICE_CONNECTED,
  EVENT_DEVICE_DISCONNECTED,
  EVENT_DEVICE_HEARTBEAT_UPDATE,
  EVENT_DEVICE_UPDATE,
  EVENT_FAILURE_TO_DELIVER,
  EVENT_LARGEST_PAYLOAD_SIZE_SEEN,
  EVENT_RECEIVED_ACK,
  EVENT_UPDATE_STATE,
} from '@electricui/protocol-constants'

import { history } from 'state'

const { manager } = global.electricui


const listeners = {
  [EVENT_DEVICE_UPDATE]: (deviceID, { transportKeyList }) => ({
    type: `electricui/device/${EVENT_DEVICE_UPDATE}`,
    deviceID,
    transportKeyList,
  }),

  [EVENT_DEVICE_CONNECTED]: (
    deviceID,
    { transportKey /* transportHash, */ },
  ) => ({
    type: `electricui/device/${EVENT_DEVICE_CONNECTED}`,
    deviceID,
    transportKey,
    /* transportHash, */
  }),

  [EVENT_DEVICE_DISCONNECTED]: (
    deviceID,
    { transportKey /* transportHash, */ },
  ) => ({
    type: `electricui/device/${EVENT_DEVICE_DISCONNECTED}`,
    deviceID,
    transportKey,
    /* transportHash, */
  }),

  [EVENT_DEVICE_HEARTBEAT_UPDATE]: (
    deviceID,
    { transportKey, /* transportHash, */ averageLatency },
  ) => ({
    type: `electricui/device/${EVENT_DEVICE_HEARTBEAT_UPDATE}`,
    deviceID,
    transportKey,
    /* transportHash, */
    averageLatency: Math.ceil(averageLatency), // we don't need sub-ms precision
  }),

  [EVENT_RECEIVED_ACK]: (deviceID, { packet, payload }) => ({
    type: `electricui/hw/${EVENT_UPDATE_STATE}`,
    deviceID: packet.deviceID,
    messageID: packet.messageID,
    payload, // the payload at the time it was sent (not the packet payload)
  }),

  [EVENT_FAILURE_TO_DELIVER]: (deviceID, { packet }) => {
    history.push('/')

    return {
      type: `electricui/device/${EVENT_FAILURE_TO_DELIVER}`,
      deviceID: packet.deviceID,
    }
  },

  [EVENT_LARGEST_PAYLOAD_SIZE_SEEN]: (deviceID, { length }) => ({
    type: `electricui/dev/${EVENT_LARGEST_PAYLOAD_SIZE_SEEN}`,
    length,
  }),
}

const MESSAGEID_NOTIFICATION = 'not'

const callbacks = {
  [MESSAGEID_NOTIFICATION]: () => {
    const notification = new Notification('Test Notification', {
      body: 'The not callback was called, and a notification arrived.',
    })

    notification.onclick = () => {
      console.log('Notification clicked')
    }
  },
}

function connectEvents(store) {
  const { dispatch } = store

  for (const key of Object.keys(listeners)) {
    const func = listeners[key]

    manager.on(key, (deviceID, payload) => {
      const event = func(deviceID, payload)
      setImmediate(() => {
        dispatch(event)
      })
    })
  }

  manager.readInterface.on('data', packet => {
    // we only have developer variables in the state

    // we discard null payloads
    if (!packet.internal) {
      if (packet.payload !== null) {
        setImmediate(() => {
          dispatch({
            type: `electricui/hw/${EVENT_UPDATE_STATE}`,
            /*
              The packet type is handled automatically by the type cache and type
              transforms below this abstraction layer, so we can disregard it.

              We also don't care about the transport it came in on.
            */
            deviceID: packet.deviceID,
            messageID: packet.messageID,
            payload: packet.payload,
          })
        })
      } else if (
        (!packet.query && packet.ackNum === 0) ||
        (packet.query && packet.ackNum > 0)
      ) {
        // check if the callback exists on our end
        if (callbacks[packet.messageID]) {
          callbacks[packet.messageID](store) // call the callback on our side
        }
      }
    }
  })

  // Immediately start the discovery process for polling methods
  manager.pollDiscovery()
}

export default connectEvents
