// @flow
import React, { Component } from 'react'

import Slider from 'rc-slider'

import Electrify from 'electricui-components/components/Electrify'

import { getDependencyProps, accessState } from 'electricui-components/utils'

import './slider.global.css'

type Props = {
  write: func,
  variable: string,
  continuous: boolean,
  min: number,
  max: number,
  disabled: boolean
}

class ElectricSlider extends Component<Props> {
  props: Props

  handleChange = value => {
    const { write, variable, continuous } = this.props

    write({ [variable]: value }, continuous, false) // no ack
  }

  handleChangeComplete = value => {
    const { write, variable } = this.props

    write({ [variable]: value }, true, true)
  }

  render() {
    const { variable, min, max, disabled } = this.props

    const value = accessState(this.props, variable)

    const rest = getDependencyProps(Slider, this.props)

    return (
      <Slider
        value={value}
        onChange={this.handleChange}
        onAfterChange={this.handleChangeComplete}
        min={min}
        max={max}
        disabled={disabled}
        {...rest}
      />
    )
  }
}

export default Electrify(ElectricSlider)
