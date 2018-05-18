import React from 'react'
import { render } from 'react-dom'
import { configureStore, history } from 'state'

import { AppContainer } from 'react-hot-loader'

import connectEvents from 'electricui-state/events'

import Root from './Root'

const store = configureStore()

connectEvents(store)

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root') // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
