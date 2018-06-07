import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import electricui from 'electricui-state/reducer'

const rootReducer = combineReducers({
  electricui,
  router,
})

export default rootReducer
