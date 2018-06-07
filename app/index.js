import 'config'

import { configureStore, history } from 'state'

import { AppContainer } from 'react-hot-loader'
import React from 'react'
import Root from './Root'
import connectEvents from 'electricui-state/events'
import { render } from 'react-dom'

const store = configureStore()

connectEvents(store)

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root') // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root'),
    )
  })
}
