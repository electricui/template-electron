import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import { Store } from 'redux'

import { DeviceManagerProxy } from '@electricui/components-core'
import { ReactReduxContext } from '@electricui/core-redux-state'
import {
  DeviceManagerStatusModal,
  DarkModeWrapper,
} from '@electricui/components-desktop-blueprint'
import { DarkModeProvider } from '@electricui/components-desktop'

import { LocationProvider, Router } from '@reach/router'
import { history } from '@electricui/utility-electron'

import ConnectionPage from './pages/ConnectionPage'
import DevicePages from './pages/DevicePages'
import DeviceLoadingPage from './pages/DeviceLoadingPage'
import { TimeSeriesDataStore } from '@electricui/core-timeseries'
import { sourceFactory, timeseriesFactories } from './datasources'

import WrapDeviceContextWithLocation from './pages/WrapDeviceContextWithLocation'

interface RootProps {
  store: Store
}

class Root extends React.Component<RootProps> {
  render() {
    const { store } = this.props

    return (
      <Provider store={store} context={ReactReduxContext}>
        <DeviceManagerProxy>
          <TimeSeriesDataStore
            sourceFactory={sourceFactory}
            timeseriesFactories={timeseriesFactories}
            duration={30 * 1000}
            maxItems={10000}
          >
            <DarkModeProvider>
              <DarkModeWrapper>
                <LocationProvider history={history}>
                  <Router>
                    <ConnectionPage path="/" />
                    <WrapDeviceContextWithLocation path="device_loading/:deviceID/">
                      <DeviceLoadingPage path="/" />
                    </WrapDeviceContextWithLocation>
                    <WrapDeviceContextWithLocation path="devices/:deviceID/">
                      <DevicePages path="*" />
                    </WrapDeviceContextWithLocation>
                  </Router>
                </LocationProvider>
              </DarkModeWrapper>
            </DarkModeProvider>
          </TimeSeriesDataStore>
        </DeviceManagerProxy>
      </Provider>
    )
  }
}

// Use react-hot-loader for the root element
export default hot(Root)
