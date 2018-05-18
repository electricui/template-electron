export default function accessState(state, key, hardware = false) {
  return hardware ? state[`_hw_${key}`] : state[`_ui_${key}`]
}
