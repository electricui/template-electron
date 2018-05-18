// @flow
import React, { Component } from 'react'

import InputNumber from 'rc-input-number'

import Electrify from 'electricui-components/components/Electrify'

import { getDependencyProps, accessState } from 'electricui-components/utils'

import './chevron.global.css'

type Props = {
  write: func,
  variable: string
}

class ElectricNumberInput extends Component<Props> {
  props: Props

  handleChange = value => {
    const { write, variable } = this.props

    write({ [variable]: value }, true)
  }

  render() {
    const { variable } = this.props

    const value = accessState(this.props, variable)

    const rest = getDependencyProps(InputNumber, this.props)

    return <InputNumber value={value} onChange={this.handleChange} {...rest} />
  }
}

export default Electrify(ElectricNumberInput)
