import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'

import {
  DeviceIDContextProvider,
  DeviceManagerProxy,
} from '@electricui/components-core'
import { ReactReduxContext } from '@electricui/core-redux-state'
import { Router, RouteComponentProps, navigate } from '@reach/router'
import { Button } from '@blueprintjs/core'

import ConnectionPage from './ConnectionPage'
import FirstDevicePage from './FirstDevicePage'

import { TimeSeriesDataStore } from '@electricui/core-timeseries'
import { sourceFactory, timeseriesFactories } from './charts'

interface RootProps {
  store: Store
}

interface InjectDeviceIDFromLocation {
  deviceID?: string
}
interface PotentialErrorState {
  hasError: boolean
}

class WrapDeviceContextWithLocation extends React.Component<
  RouteComponentProps & InjectDeviceIDFromLocation,
  PotentialErrorState
> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.log('Caught error', error, info)
  }

  render() {
    const { children, deviceID } = this.props

    if (this.state.hasError) {
      return (
        <div>
          Something went wrong, go back?
          <Button
            onClick={() => {
              navigate('/')
            }}
          >
            Back
          </Button>
        </div>
      )
    }

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
