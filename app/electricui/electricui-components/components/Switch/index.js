import React, { Component } from 'react'

import Switch from 'rc-switch'

import Electrify from 'electricui-components/components/Electrify'

import { getDependencyProps, checkHigh } from 'electricui-components/utils'

import './switch.global.css'
/*
type Props = {
  write: func,
  high: object,
  low: object,
  disabled: boolean
}
*/
class ElectricSwitch extends Component {
  onChange = checked => {
    const { write, high, low } = this.props

    if (checked && high) {
      write(high, true)
    } else if (!checked && low) {
      write(low, true)
    }
  }

  render() {
    const { high, low, disabled } = this.props

    const rest = getDependencyProps(Switch, this.props)

    const highCorrect = high && checkHigh(this.props, high)
    const lowCorrect = low && checkHigh(this.props, low)

    let state = { className: 'indeterminate' }

    if (high && highCorrect) {
      state = { checked: true }
    } else if (low && lowCorrect) {
      state = { checked: false }
    }

    return (
      <Switch
        onChange={this.onChange}
        {...state}
        {...rest}
        disabled={disabled}
      />
    )
  }
}

export default Electrify(ElectricSwitch)
