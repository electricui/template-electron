// @flow
import React, { Component } from 'react'

import { Icon } from 'semantic-ui-react'

import Electrify from 'electricui-components/components/Electrify'

import { accessState, getDependencyProps } from 'electricui-components/utils'

import './signal.global.css'

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

class SignalIndicator extends Component<Props> {
  props: Props

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
      fullColor
    } = this.props

    const value = accessState(this.props, variable)

    const rest = getDependencyProps(Icon, this.props)

    let clipAmount = 0.95
    let iconColor = emptyColor || 'black'

    if (full && value >= full) {
      clipAmount = 0
      iconColor = fullColor || 'green'
    } else if (high && value >= high) {
      clipAmount = 0.25
      iconColor = highColor || 'blue'
    } else if (medium && value >= medium) {
      clipAmount = 0.5
      iconColor = mediumColor || 'orange'
    } else if (low && value >= low) {
      clipAmount = 0.8
      iconColor = lowColor || 'red'
    }

    return (
      <Icon.Group>
        <Icon
          {...rest}
          className="electricSignal"
          name="signal"
          color={iconColor}
          style={{ WebkitClipPath: `inset(0 ${clipAmount}em 0 0)` }}
        />
        <Icon {...rest} name="signal" style={{ color: 'rgba(0,0,0,0.2)' }} />
      </Icon.Group>
    )
  }
}

export default Electrify(SignalIndicator)
