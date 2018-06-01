import React, { Component } from 'react'

import Electrify from 'electricui-components/components/Electrify'

import { accessState } from 'electricui-components/utils'
/*
type Props = {
  variable: string,
  hardware: boolean
}*/

class Printer extends Component {
  render() {
    const { variable, hardware } = this.props
    const value = accessState(this.props, variable, hardware)

    return <span>{value}</span>
  }
}

export default Electrify(Printer, { async: true })
