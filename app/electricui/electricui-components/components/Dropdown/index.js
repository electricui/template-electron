// @flow
import React, { Component } from 'react'

import { Dropdown } from 'semantic-ui-react'

import Electrify from 'electricui-components/components/Electrify'

import { getDependencyProps, checkHigh } from 'electricui-components/utils'

type Props = {
  write: func,
  options: array
}

class ElectricDropdown extends Component<Props> {
  props: Props

  onChange = (e, data) => {
    const { write, options } = this.props

    const option = options[parseInt(data.value, 10)]

    write(option.high, true)
  }

  render() {
    const { options } = this.props

    const rest = getDependencyProps(Dropdown, this.props)

    let value = ''

    const optionsWithKeys = []

    for (const key of Object.keys(options)) {
      const option = options[key]

      option.value = String(key)

      option.key = key

      optionsWithKeys[key] = option

      const correct = checkHigh(this.props, option.high)

      if (correct) {
        value = String(key)
      }
    }

    return <Dropdown onChange={this.onChange} value={value} {...rest} />
  }
}

export default Electrify(ElectricDropdown)
