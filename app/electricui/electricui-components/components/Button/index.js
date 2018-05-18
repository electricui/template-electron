// @flow
import React, { Component } from 'react'

import { Button } from 'semantic-ui-react'

import Electrify from 'electricui-components/components/Electrify'

import { getDependencyProps } from 'electricui-components/utils'

type Props = {
  write: func,
  high: object
}

class ElectricButton extends Component<Props> {
  props: Props

  onClick = () => {
    const { write, high } = this.props

    if (Array.isArray(high)) {
      for (const obj of high) {
        write(obj, true)
      }
    } else {
      write(high, true)
    }
  }

  render() {
    const rest = getDependencyProps(Button, this.props)

    return <Button onClick={this.onClick} {...rest} />
  }
}

export default Electrify(ElectricButton)
