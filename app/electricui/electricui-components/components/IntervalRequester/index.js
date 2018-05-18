// @flow
import React, { Component } from 'react'

import Electrify from 'electricui-components/components/Electrify'

type Props = {
  variable: string,
  variables: array,
  interval: number,
  request: func,
  deviceID: string
}

class IntervalRequester extends Component<Props> {
  props: Props

  componentDidMount() {
    const { interval = 100 } = this.props
    this.intervalometer = setInterval(this.tick, interval)
  }

  componentWillUnmount() {
    clearInterval(this.intervalometer)
  }

  tick = () => {
    const { request, variable, variables, deviceID } = this.props

    if (variables) {
      request(deviceID, variables)
    } else {
      request(deviceID, [variable])
    }
  }

  render() {
    return null
  }
}

export default Electrify(IntervalRequester, { noupdates: true })
