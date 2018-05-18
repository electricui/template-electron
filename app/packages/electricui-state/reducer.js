import { combineReducers } from 'redux'
import ui from './ui'
import hw from './hw'
import device from './device'
import dev from './dev'

const reducer = combineReducers({ ui, hw, device, dev })

export default reducer
