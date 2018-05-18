import { EVENT_UPDATE_STATE } from '@electricui/protocol-constants'

// Actions
export const UPDATE_STATE = `electricui/hw/${EVENT_UPDATE_STATE}`

const initialState = {}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case UPDATE_STATE: {
      return Object.assign({}, state, {
        [action.deviceID]: Object.assign({}, state[action.deviceID], {
          [action.messageID]: action.payload
        })
      })
    }
    default:
      return state
  }
}

// Getters
export function getDeviceVariable(state, deviceID, variable) {
  if (
    !state.electricui.hw[deviceID] ||
    state.electricui.hw[deviceID][variable] === null ||
    state.electricui.hw[deviceID][variable] === undefined
  ) {
    return null
  }
  return state.electricui.hw[deviceID][variable]
}
