// @flow
import React, { Component } from 'react'

import DeviceIDContext from './provider'

type Props = {
  deviceID: string,
  children: element
}

class DeviceIDContextProvider extends Component<Props> {
  props: Props

  render() {
    const { children, deviceID } = this.props

    return (
      <DeviceIDContext.Provider value={deviceID}>
        {children}
      </DeviceIDContext.Provider>
    )
  }
}

export default DeviceIDContextProvider
