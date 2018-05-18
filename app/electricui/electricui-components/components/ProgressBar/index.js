// @flow
import React, { Component } from 'react'

import { Progress } from 'semantic-ui-react'

import Electrify from 'electricui-components/components/Electrify'

import { accessState, getDependencyProps } from 'electricui-components/utils'

type Props = {
  variable: string,
  min: number,
  max: number,
  children: element
}

class ElectricProgressBar extends Component<Props> {
  props: Props

  render() {
    const { variable, min, max, children } = this.props

    const value = accessState(this.props, variable)

    const rest = getDependencyProps(Progress, this.props)

    const clamped = Math.max(min, Math.min(value, max))

    const percent = (clamped - min) / (max - min) * 100

    return (
      <Progress percent={percent} {...rest}>
        {children}
      </Progress>
    )
  }
}

export default Electrify(ElectricProgressBar)
