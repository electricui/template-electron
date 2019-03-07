import React, { Component } from 'react'

import { withDeviceID } from '@electricui/components-core'
import { DeviceID } from '@electricui/core'

interface RootProps {
  deviceID: DeviceID
}

class DeviceIDTestComponent extends Component<RootProps> {
  render() {
    return <div>DeviceID: {this.props.deviceID}</div>
  }
}

export default withDeviceID(DeviceIDTestComponent)
