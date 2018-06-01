import React, { PureComponent } from 'react'

import { connect } from 'react-redux'

import { Container, Segment, List } from 'semantic-ui-react'
import DiscoverDevices from 'connections/components/DiscoverDevices'

import { getDevices } from 'electricui-state/device'
import { arrayEquals } from 'electricui-state/utils'

import ConnectionRow from 'connections/components/ConnectionRow'
/*
type Props = {
  devices: object
}
*/
class ConnectionPage extends PureComponent {
  render() {
    const { devices } = this.props

    const list = devices.map(deviceID => (
      <ConnectionRow deviceID={deviceID} key={deviceID} />
    ))

    return (
      <Container style={{ width: 400, margin: '0 auto' }}>
        <h2 style={{ paddingTop: 150, textAlign: 'center' }}>Electric UI</h2>
        <Segment>
          <List selection verticalAlign="middle">
            {list}
          </List>
        </Segment>
        <DiscoverDevices color="green" fluid compact>
          Refresh
        </DiscoverDevices>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    devices: getDevices(state),
  }
}

const options = {
  // === doesn't work for arrays, we use our own comparitor
  areStatesEqual: (prev, next) =>
    arrayEquals(getDevices(prev), getDevices(next)),
}

export default connect(mapStateToProps, null, null, options)(ConnectionPage)
