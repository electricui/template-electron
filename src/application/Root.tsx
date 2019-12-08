import {
  DarkModeWrapper,
  NoIPCModal,
} from '@electricui/components-desktop-blueprint'
import { LocationProvider, Router } from '@reach/router'
import { sourceFactory, timeseriesFactories } from './datasources'

import { ConnectionPage } from './pages/ConnectionPage'
import { DarkModeProvider } from '@electricui/components-desktop'
import { DeviceLoadingPage } from './pages/DeviceLoadingPage'
import { DeviceManagerProxy } from '@electricui/components-core'
import { DevicePages } from './pages/DevicePages'
import { Provider } from 'react-redux'
import React from 'react'
import { ReactReduxContext } from '@electricui/core-redux-state'
import { RefreshIndicator } from '@electricui/components-desktop-blueprint'
import { Store } from 'redux'
import { TimeSeriesDataStore } from '@electricui/core-timeseries'
import { WrapDeviceContextWithLocation } from './pages/WrapDeviceContextWithLocation'
import { history } from '@electricui/utility-electron'

interface RootProps {
  store: Store
}

export class Root extends React.Component<RootProps> {
  render() {
    const { store } = this.props

    return (
      <RefreshIndicator>
        <Provider store={store} context={ReactReduxContext}>
          <DeviceManagerProxy renderIfNoIPC={<NoIPCModal />}>
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
      </RefreshIndicator>
    )
  }
}
