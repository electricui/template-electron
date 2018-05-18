import { EVENT_LARGEST_PAYLOAD_SIZE_SEEN } from '@electricui/protocol-constants'

// Actions
export const LARGEST_PAYLOAD_SIZE_SEEN = `electricui/dev/${EVENT_LARGEST_PAYLOAD_SIZE_SEEN}`

const initialState = {
  [EVENT_LARGEST_PAYLOAD_SIZE_SEEN]: 0
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LARGEST_PAYLOAD_SIZE_SEEN: {
      if (action.length < state[EVENT_LARGEST_PAYLOAD_SIZE_SEEN]) {
        return state
      }

      return Object.assign(
        {},
        {
          [EVENT_LARGEST_PAYLOAD_SIZE_SEEN]: action.length
        }
      )
    }
    default:
      return state
  }
}

// Getters
export function getLargestPayloadLength(state) {
  return state.electricui.dev[EVENT_LARGEST_PAYLOAD_SIZE_SEEN]
}
