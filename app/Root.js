import './app.global.css'

import React, { Component } from 'react'

import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import Routes from './routes'

// const AsyncMode = React.unstable_AsyncMode

export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    )
  }
}
