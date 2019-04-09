import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'

import {
  DeviceIDContextProvider,
  DeviceManagerProxy,
  EventConnector,
} from '@electricui/components-core'
import { ReactReduxContext } from '@electricui/core-redux-state'
import { Link, Router, RouteComponentProps } from '@reach/router'

import ConnectionPage from './ConnectionPage'
import FirstDevicePage from './FirstDevicePage'

import { TimeSeriesDataStore } from '@electricui/components-desktop-charts'
import { sourceFactory, timeseriesFactories } from './charts'

// const AsyncMode = React.unstable_AsyncMode

interface RootProps {
  store: Store
}

interface InjectDeviceIDFromLocation {
  deviceID?: string
}

class WrapDeviceContextWithLocation extends React.Component<
  RouteComponentProps & InjectDeviceIDFromLocation
> {
  render() {
    const { children, deviceID } = this.props

    return (
      <DeviceIDContextProvider deviceID={deviceID!}>
        {children}
      </DeviceIDContextProvider>
    )
  }
}

export default class Root extends React.Component<RootProps> {
  render() {
    const { store } = this.props

    return (
      <Provider store={store} context={ReactReduxContext}>
        <DeviceManagerProxy>
          <EventConnector />
          <TimeSeriesDataStore
            sourceFactory={sourceFactory}
            timeseriesFactories={timeseriesFactories}
            duration={30 * 1000}
            maxItems={1000}
          >
            <Router>
              <ConnectionPage path="/" />
              <WrapDeviceContextWithLocation path="devices/:deviceID/">
                <FirstDevicePage path="/" />
              </WrapDeviceContextWithLocation>
            </Router>
          </TimeSeriesDataStore>
        </DeviceManagerProxy>
      </Provider>
    )
  }
}
