// @flow
import React, { Component } from 'react'

import { Button } from 'semantic-ui-react'

import Electrify from 'electricui-components/components/Electrify'

import {
  getDependencyProps,
  accessState
  // deepEqual
} from 'electricui-components/utils'

type Props = {
  push: func,
  disabled: boolean,
  saveContainer: element
}

class SaveButton extends Component<Props> {
  props: Props

  onClick = () => {
    const { push, saveContainer } = this.props

    if (saveContainer) {
      push(saveContainer.messageIDs.values())
    }
  }

  render() {
    const { saveContainer, disabled } = this.props

    const rest = getDependencyProps(Button, this.props)

    if (!saveContainer) {
      return <div>Save Button must exist within a Save Container</div>
    }

    /*
    let disableButton = true

    if (!disabled) {
      for (const messageID of saveContainer.messageIDs.values()) {
        // check if hardware and UI states match

        if (
          accessState(this.props, messageID, false) !==
          accessState(this.props, messageID, true)
        ) {
          disableButton = false
          break
        }
      }
    }
*/

    const disableButton = disabled

    return <Button onClick={this.onClick} {...rest} disabled={disableButton} />
  }
}

export default Electrify(SaveButton, { hardware: true, saveButton: true })
