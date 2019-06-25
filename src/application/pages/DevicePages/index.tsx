import React from 'react'

import './device-pages.css'

import Header from '../../components/Header'
import { Router, navigate, RouteComponentProps } from '@reach/router'

import OverviewPage from './OverviewPage'
import SecondaryPage from './SecondaryPage'

import { DisconnectionModal } from '@electricui/components-desktop-blueprint'
import { Intent } from '@blueprintjs/core'

interface InjectDeviceIDFromLocation {
  deviceID?: string
}

const DevicePages = (
  props: RouteComponentProps & InjectDeviceIDFromLocation,
) => {
  if (!props.deviceID) {
    return <div>No deviceID?</div>
  }

  return (
    <React.Fragment>
      <DisconnectionModal
        intent={Intent.WARNING}
        icon="satellite"
        navigateToConnectionsScreen={() => navigate('/')}
      >
        <p>
          Connection has been lost with your device. If we successfully
          reconnect this dialog will be dismissed.
        </p>
      </DisconnectionModal>

      <div className="device-pages">
        <Header deviceID={props.deviceID} {...props} />
        <div className="device-content">
          <Router>
            <OverviewPage path="/" />
            <SecondaryPage path="secondary" />
          </Router>
        </div>
      </div>
    </React.Fragment>
  )
}

export default DevicePages
