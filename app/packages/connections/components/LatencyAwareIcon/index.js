// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { Icon } from 'semantic-ui-react'

import {
  getConnectionState,
  getConnectionLatency
} from 'electricui-state/device'

import './pulsing.global.css'

type Props = {
  // since it's used in mapStateToProps
  deviceID: string, // eslint-disable-line
  transportKey: string,
  connected: boolean,
  latency: number
}

const iconReplacements = {
  serial: 'usb',
  websocket: 'wifi'
}

class LatencyAwareIcon extends PureComponent {
  props: Props

  render() {
    const { transportKey, connected, latency } = this.props

    let icon = transportKey

    if (iconReplacements[icon]) {
      icon = iconReplacements[icon]
    }

    if (!connected) {
      return <Icon name={icon} color="grey" className="latency" />
    }

    if (latency === Infinity) {
      return <Icon name={icon} color="blue" className="latency" />
    }

    return (
      <Icon
        name={icon}
        color={latency < 100 ? 'green' : 'orange'}
        className={
          latency < 100 ? 'pulsing-fast latency' : 'pulsing-slow latency'
        }
      />
    )
  }
}

function mapStateToProps(state, { deviceID, transportKey }) {
  return {
    connected: getConnectionState(state, deviceID, transportKey),
    latency: getConnectionLatency(state, deviceID, transportKey)
  }
}

export default connect(mapStateToProps)(LatencyAwareIcon)
