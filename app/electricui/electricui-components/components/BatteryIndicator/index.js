import React, { Component } from 'react'

import { Icon } from 'semantic-ui-react'

import Electrify from 'electricui-components/components/Electrify'

import { accessState, getDependencyProps } from 'electricui-components/utils'
/*
type Props = {
  variable: string,
  low: number,
  medium: number,
  high: number,
  full: number,
  emptyColor: string,
  lowColor: string,
  mediumColor: string,
  highColor: string,
  fullColor: string
}
*/
class BatteryIndicator extends Component {
  render() {
    const {
      variable,
      low,
      medium,
      high,
      full,
      emptyColor,
      lowColor,
      mediumColor,
      highColor,
      fullColor,
    } = this.props

    const value = accessState(this.props, variable)

    const rest = getDependencyProps(Icon, this.props)

    let batteryIndicator = 'empty'
    let iconColor = emptyColor || 'black'

    if (full && value >= full) {
      batteryIndicator = 'full'
      iconColor = fullColor || 'green'
    } else if (high && value >= high) {
      batteryIndicator = 'high'
      iconColor = highColor || 'blue'
    } else if (medium && value >= medium) {
      batteryIndicator = 'medium'
      iconColor = mediumColor || 'orange'
    } else if (low && value >= low) {
      batteryIndicator = 'low'
      iconColor = lowColor || 'red'
    }

    return (
      <Icon
        {...rest}
        className="electricSignal"
        name={`battery ${batteryIndicator}`}
        color={iconColor}
      />
    )
  }
}

export default Electrify(BatteryIndicator)
