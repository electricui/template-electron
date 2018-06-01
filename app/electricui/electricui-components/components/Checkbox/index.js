import React, { Component } from 'react'

import { Checkbox } from 'semantic-ui-react'

import Electrify from 'electricui-components/components/Electrify'

import { getDependencyProps, checkHigh } from 'electricui-components/utils'
/*
type Props = {
  write: func,
  high: object,
  low: object
}
*/
class ElectricCheckbox extends Component {
  onChange = (e, data) => {
    const { write, high, low } = this.props

    if (data.checked && high) {
      write(high, true)
    } else if (!data.checked && low) {
      write(low, true)
    }
  }

  render() {
    const { high, low } = this.props

    const rest = getDependencyProps(Checkbox, this.props)

    const highCorrect = high && checkHigh(this.props, high)
    const lowCorrect = low && checkHigh(this.props, low)

    let state = { indeterminate: true }

    if (high && highCorrect) {
      state = { checked: true }
    } else if (low && lowCorrect) {
      state = { checked: false }
    }

    return <Checkbox onChange={this.onChange} {...state} {...rest} />
  }
}

export default Electrify(ElectricCheckbox)
