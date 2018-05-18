import accessState from './accessState'

export default function checkHigh(state, high, hardware = false) {
  for (const key of Object.keys(high)) {
    const expectedValue = high[key]

    const stateValue = accessState(state, key, hardware)

    if (stateValue !== expectedValue) {
      return false
    }
  }

  return true
}
