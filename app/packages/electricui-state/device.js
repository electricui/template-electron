import {
  EVENT_DEVICE_UPDATE,
  EVENT_DEVICE_CONNECTED,
  EVENT_DEVICE_DISCONNECTED,
  EVENT_DEVICE_HEARTBEAT_UPDATE
} from '@electricui/protocol-constants'

import { manager } from 'config'

// Actions
const UPDATE = `electricui/device/${EVENT_DEVICE_UPDATE}`
const CONNECTED = `electricui/device/${EVENT_DEVICE_CONNECTED}`
const DISCONNECTED = `electricui/device/${EVENT_DEVICE_DISCONNECTED}`
const HEARTBEAT_UPDATE = `electricui/device/${EVENT_DEVICE_HEARTBEAT_UPDATE}`

const initialState = {
  available: {},
  connections: {},
  heartbeats: {}
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff

    case UPDATE: {
      if (state.available[action.deviceID] === action.transportKeyList) {
        return state
      }
      return Object.assign({}, state, {
        available: Object.assign({}, state.available, {
          [action.deviceID]: action.transportKeyList
        })
      })
    }

    case CONNECTED: {
      return Object.assign({}, state, {
        connections: Object.assign({}, state.connections, {
          [action.deviceID]: Object.assign(
            {},
            state.connections[action.deviceID],
            {
              [action.transportKey]: true
            }
          )
        })
      })
    }

    case DISCONNECTED: {
      return Object.assign({}, state, {
        connections: Object.assign({}, state.connections, {
          [action.deviceID]: Object.assign(
            {},
            state.connections[action.deviceID],
            {
              [action.transportKey]: undefined
            }
          )
        }),
        heartbeats: Object.assign({}, state.heartbeats, {
          [action.deviceID]: Object.assign(
            {},
            state.connections[action.deviceID],
            {
              [action.transportKey]: undefined
            }
          )
        })
      })
    }

    case HEARTBEAT_UPDATE: {
      return Object.assign({}, state, {
        heartbeats: Object.assign({}, state.heartbeats, {
          [action.deviceID]: Object.assign(
            {},
            state.heartbeats[action.deviceID],
            {
              [action.transportKey]: action.averageLatency
            }
          )
        })
      })
    }

    default:
      return state
  }
}

// Action Creators
export function pollDiscovery() {
  return () => {
    manager.pollDiscovery()
  }
}

export function connect(deviceID) {
  return () => {
    manager.connect(deviceID)
  }
}

export function disconnect(deviceID) {
  return () => {
    manager.disconnect(deviceID)
  }
}

// Getters
export function getDevices(state) {
  return Object.keys(state.electricui.device.available)
}

export function getConnectionMethods(state, deviceID) {
  return state.electricui.device.available[deviceID]
}

export function getConnectionState(state, deviceID, transportKey) {
  const connections = state.electricui.device.connections[deviceID]
  return connections && connections[transportKey]
}

export function getConnectionLatency(state, deviceID, transportKey) {
  const heartbeats = state.electricui.device.heartbeats[deviceID]
  return heartbeats && heartbeats[transportKey] !== undefined
    ? heartbeats[transportKey]
    : Infinity
}

export function getDeviceConnectionState(state, deviceID) {
  const connections = state.electricui.device.connections[deviceID]

  return (
    connections &&
    Object.keys(connections).filter(key => connections[key] !== undefined)
      .length > 0
  )
}
