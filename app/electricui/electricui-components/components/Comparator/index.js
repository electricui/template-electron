import React, { Component } from 'react'

import Electrify from 'electricui-components/components/Electrify'

import { checkTrigger } from 'electricui-components/utils'
/*
type Props = {
  triggers: array
}
*/
class Comparator extends Component {
  checkTriggers = triggers => {
    for (const trigger of triggers) {
      const check = trigger.check

      if (checkTrigger(this.props, check)) {
        return trigger.result
      }
    }

    return undefined
  }

  render() {
    const { triggers } = this.props

    const display = this.checkTriggers(triggers)

    if (display === undefined) {
      return null
    }

    return display
  }
}

export default Electrify(Comparator)
