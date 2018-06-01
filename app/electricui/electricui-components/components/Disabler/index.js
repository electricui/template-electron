import React, { Component } from 'react'

import Electrify from 'electricui-components/components/Electrify'

import { checkTrigger } from 'electricui-components/utils'

import DisablerContext from './provider'
/*
type Props = {
  children: element,
  trigger: array
}
*/
class Disabler extends Component {
  render() {
    const { trigger, children } = this.props

    let disabled = null

    if (checkTrigger(this.props, trigger)) {
      disabled = true
    }

    return (
      <DisablerContext.Provider value={disabled}>
        {children}
      </DisablerContext.Provider>
    )
  }
}

export default Electrify(Disabler)
