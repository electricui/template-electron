import {
  EVENT_DEVICE_CONNECTED,
  EVENT_UPDATE_STATE
} from '@electricui/protocol-constants'

import dot from 'dot-object'

const { manager } = global.electricui

// Actions

export const HW_UPDATE_STATE = `electricui/hw/${EVENT_UPDATE_STATE}`
export const COMMIT_CHANGES = 'electricui/ui/commitChanges'
export const PUSH_CHANGES = 'electricui/ui/pushChanges'

const CONNECTED = `electricui/device/${EVENT_DEVICE_CONNECTED}`
// const DISCONNECTED = `electricui/device/${EVENT_DEVICE_DISCONNECTED}`

const initialState = {
  /*
  <deviceID> : {
    past: [{
      ...
      <variable>: value
      ...
    },
    {
      ...
      <variable>: value
      ...
    }],
    present: {
      ...
      <variable>: value
      ...
    },
    future: []
  }
  */
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // when the hardware updates, we update the UI too
    case HW_UPDATE_STATE: {
      return Object.assign({}, state, {
        [action.deviceID]: Object.assign({}, state[action.deviceID], {
          [action.messageID]: action.payload,
        }),
      })
    }

    case CONNECTED: {
      return Object.assign(
        {},
        {
          [action.deviceID]: {}, // if we haven't received any messages yet
        },
        state,
      )
    }

    case COMMIT_CHANGES: {
      const target = {}

      for (const key of Object.keys(action.changes)) {
        if (key.indexOf('.') > -1) {
          dot.str(key, action.changes[key], target)
        } else {
          target[key] = action.changes[key]
        }
      }

      return Object.assign({}, state, {
        [action.deviceID]: Object.assign({}, state[action.deviceID], target),
      })
    }

    case PUSH_CHANGES: {
      return state
    }

    default:
      return state
  }
}

// Action Creators
export function commit(deviceID, changes) {
  // console.log('merging changes', changes)
  return { type: COMMIT_CHANGES, deviceID, changes }
}

export function push(deviceID, keys, ack = true) {
  return (dispatch, getState) => {
    // console.log('pushing changes for keys:', keys)

    const state = getState()

    const newKeys = new Set()

    // we only want the messageIDs
    for (const key of keys) {
      newKeys.add(key.split('.')[0])
    }

    // send the writes
    for (const key of newKeys.values()) {
      manager.writeInterface.write({
        deviceID,
        ack, // we request acks, we don't re-query
        internal: false,
        messageID: key,
        payload: getUIVariable(state, deviceID, key),
      })
    }
  }
}

export function request(deviceID, keys) {
  return () => {
    const newKeys = new Set()

    // we only want the messageIDs
    for (const key of keys) {
      newKeys.add(key.split('.')[0])
    }

    // send the queries
    for (const key of newKeys.values()) {
      manager.writeInterface.write({
        deviceID,
        internal: false,
        messageID: key,
        query: true,
        payload: null,
      })
    }
  }
}

// Getters
export function getUIVariable(state, deviceID, variable) {
  if (
    !state.electricui.ui[deviceID] ||
    state.electricui.ui[deviceID][variable] === null ||
    state.electricui.ui[deviceID][variable] === undefined
  ) {
    return null
  }
  return state.electricui.ui[deviceID][variable]
}
