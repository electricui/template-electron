// @flow
import React, { Component } from 'react'

import { Checkbox } from 'semantic-ui-react'

import Electrify from 'electricui-components/components/Electrify'

import { getDependencyProps, checkHigh } from 'electricui-components/utils'

type Props = {
  write: func,
  high: object
}

class ElectricRadio extends Component<Props> {
  props: Props

  onChange = (e, data) => {
    const { write, high } = this.props

    if (data.checked && high) {
      write(high, true)
    }
  }

  render() {
    const { high } = this.props

    const rest = getDependencyProps(Checkbox, this.props)

    const highCorrect = high && checkHigh(this.props, high)

    return (
      <Checkbox
        radio
        onChange={this.onChange}
        checked={high && highCorrect}
        {...rest}
      />
    )
  }
}

export default Electrify(ElectricRadio)
