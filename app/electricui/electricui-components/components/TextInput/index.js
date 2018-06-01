import React, { Component } from 'react'

import { Input } from 'semantic-ui-react'

import Electrify from 'electricui-components/components/Electrify'

import { getDependencyProps, accessState } from 'electricui-components/utils'
/*
type Props = {
  write: func,
  variable: string
}
*/
class ElectricTextInput extends Component {
  handleChange = (e, data) => {
    const { write, variable } = this.props

    write({ [variable]: data.value }, true)
  }

  render() {
    const { variable } = this.props

    const textValue = accessState(this.props, variable)

    const rest = getDependencyProps(Input, this.props)

    return <Input value={textValue} onChange={this.handleChange} {...rest} />
  }
}

export default Electrify(ElectricTextInput)
