import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { List, Button } from 'semantic-ui-react'

import LatencyAwareIcon from 'connections/components/LatencyAwareIcon'

import {
  getConnectionMethods,
  getDeviceConnectionState,
} from 'electricui-state/device'

import * as deviceActions from 'electricui-state/device'

import { history } from 'state'

const DISCONNECTED = 0
const CONNECTING = 1
const CONNECTED = 2

class ConnectionRow extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { connection: props.connected ? CONNECTED : DISCONNECTED }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.connected) {
      this.setState({ connection: CONNECTED })
    } else {
      this.setState({ connection: DISCONNECTED })
    }
  }

  connect = () => {
    const { deviceID } = this.props
    const { connection } = this.state

    if (connection === DISCONNECTED) {
      this.setState({ connection: CONNECTING })
      this.props.connect(deviceID)
    }
  }

  goTo = () => {
    const { deviceID } = this.props
    const { connection } = this.state

    if (connection === CONNECTED) {
      history.push(`devices/${deviceID}/`)
    }
  }

  disconnect = () => {
    const { deviceID, disconnect } = this.props
    const { connection } = this.state

    if (connection === CONNECTED) {
      this.setState({ connection: DISCONNECTED })
      disconnect(deviceID)
    }
  }

  render() {
    const { deviceID, transports } = this.props
    const { connection } = this.state

    return (
      <List.Item key={deviceID}>
        <List.Content floated="left">
          <List.Header>{deviceID}</List.Header>
          {transports.map(transportKey => (
            <LatencyAwareIcon
              key={deviceID + transportKey}
              deviceID={deviceID}
              transportKey={transportKey}
            />
          ))}
        </List.Content>
        <List.Content floated="right">
          {connection === DISCONNECTED &&
            transports.length > 0 && (
              <Button size="mini" color="teal" compact onClick={this.connect}>
                Connect
              </Button>
            )}
          {connection === CONNECTING && (
            <Button size="mini" color="teal" compact loading disabled>
              Connect
            </Button>
          )}
          {connection === CONNECTED && (
            <div>
              <Button size="mini" color="red" compact onClick={this.disconnect}>
                Disconnect
              </Button>
              <Button size="mini" color="blue" compact onClick={this.goTo}>
                Go To Device
              </Button>
            </div>
          )}
        </List.Content>
      </List.Item>
    )
  }
}

function mapStateToProps(state, { deviceID }) {
  return {
    transports: getConnectionMethods(state, deviceID),
    connected: getDeviceConnectionState(state, deviceID),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(deviceActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionRow)
