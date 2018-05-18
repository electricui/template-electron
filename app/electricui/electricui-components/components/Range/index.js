// @flow
import React, { Component } from 'react'

import { Range } from 'rc-slider'

import Electrify from 'electricui-components/components/Electrify'

import { getDependencyProps, accessState } from 'electricui-components/utils'

import './../Slider/slider.global.css'

type Props = {
  write: func,
  variables: array,
  continuous: boolean,
  min: number,
  max: number,
  disabled: boolean
}

class ElectricRange extends Component<Props> {
  props: Props

  push = (value, final) => {
    const { write, variables, continuous } = this.props

    const obj = {}

    for (const [index, variable] of variables.entries()) {
      obj[variable] = value[index]
    }

    write(obj, true, final)
  }

  handleChange = value => {
    this.push(value, false)
  }

  handleChangeComplete = value => {
    this.push(value, true)
  }

  render() {
    const { variables, min, max, disabled } = this.props

    const count = variables.length - 1

    const value = variables.map(variable => accessState(this.props, variable))

    const rest = getDependencyProps(Range, this.props)

    return (
      <Range
        value={value}
        count={count}
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

export default Electrify(ElectricRange)
