// @flow
import React, { Component } from 'react'
// import { flushSync } from 'react-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { createSelectorCreator, defaultMemoize } from 'reselect'

import * as UIActions from 'electricui-state/ui'
import * as HWActions from 'electricui-state/hw'
// import { deepEqual } from 'electricui-components/utils'
import dot from 'dot-object'

import DeviceIDContext from './../DeviceIDContextProvider/provider'
import DisablerContext from './../Disabler/provider'
import SaveContainerContext from './../SaveContainer/provider'

// const AsyncMode = React.unstable_AsyncMode

type ElectricProps = {
  deviceID: string,
  commit: func,
  push: func,
  saveContainer: element,
  variables: array,
  variable: string
}

/*
  options = {
    noupdates: false,
    hardware: false,
    saveButton: false
  }
*/

function Electrify(ComponentToWrap, options = {}) {
  // first we take the component and add our ElectricUI methods
  class ElectricComponent extends Component {
    props: ElectricProps

    constructor(props) {
      super(props)

      const { saveContainer } = props

      if (saveContainer) {
        let messageIDs = []

        if (props.variables !== null && props.variables !== undefined) {
          messageIDs = props.variables
        } else if (props.variable !== null && props.variable !== undefined) {
          messageIDs = [props.variable]
        }

        saveContainer.register(messageIDs)
      }
    }

    write = (changes, push = true, ack = true) => {
      const { deviceID, saveContainer } = this.props

      //  flushSync(() => {
      this.props.commit(deviceID, changes)
      //  })

      if (push && saveContainer === null) {
        this.props.push(deviceID, Object.keys(changes), ack)
      }
    }

    push = (keys, ack = true) => {
      const { deviceID } = this.props

      this.props.push(deviceID, keys, ack)
    }

    render() {
      return (
        <ComponentToWrap {...this.props} write={this.write} push={this.push} />
      )
    }
  }

  function mapStateToProps(currentState, ownProps) {
    const slice = {}

    let messageIDs = []
    const parsedMessageID = new Set()

    if (ownProps.variables !== null && ownProps.variables !== undefined) {
      messageIDs = ownProps.variables
    } else if (ownProps.variable !== null && ownProps.variable !== undefined) {
      messageIDs = [ownProps.variable]
    }

    // we only want the messageIDs, not the dot notation keys
    for (const key of messageIDs) {
      parsedMessageID.add(key.split('.')[0])
    }

    // special case of save buttons using their save containers' messageIDs
    if (options.saveButton) {
      for (const key of ownProps.saveContainer.messageIDs.values()) {
        parsedMessageID.add(key)
      }
    }

    // retreive the data out of the global state
    for (const messageID of parsedMessageID) {
      const uiValue = UIActions.getUIVariable(
        currentState,
        ownProps.deviceID,
        messageID
      )

      if (uiValue instanceof Object) {
        // unwrap the object and place it in the slice
        const uiFlat = dot.dot(uiValue)

        for (const key of Object.keys(uiFlat)) {
          slice[`_ui_${messageID}.${key}`] = uiFlat[key]
        }
      } else {
        slice[`_ui_${messageID}`] = uiValue
      }

      if (ownProps.hardware || options.hardware) {
        const hwValue = HWActions.getDeviceVariable(
          currentState,
          ownProps.deviceID,
          messageID
        )

        if (hwValue instanceof Object) {
          // unwrap the object and place it in the slice
          const hwFlat = dot.dot(hwValue)

          for (const key of Object.keys(hwFlat)) {
            slice[`_hw_${messageID}.${key}`] = hwFlat[key]
          }
        } else {
          slice[`_hw_${messageID}`] = hwValue
        }
      }
    }

    return slice
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(UIActions, dispatch)
  }

  // we wrap the component into the redux context
  const ConnectedComponent = connect(
    options.noupdates ? null : mapStateToProps,
    mapDispatchToProps
  )(ElectricComponent)

  // then we grab the current deviceID out of our context, and put that on the
  // top of this stack of components

  // eslint-disable-next-line
  class DeviceIDContextReceiver extends Component {
    render() {
      return (
        <DeviceIDContext.Consumer>
          {deviceID => (
            <DisablerContext.Consumer>
              {disabled => (
                <SaveContainerContext.Consumer>
                  {saveContainer => (
                    <ConnectedComponent
                      {...this.props}
                      deviceID={deviceID}
                      disabled={disabled}
                      saveContainer={saveContainer}
                    />
                  )}
                </SaveContainerContext.Consumer>
              )}
            </DisablerContext.Consumer>
          )}
        </DeviceIDContext.Consumer>
      )
    }
  }

  // and we return the complete component
  return DeviceIDContextReceiver
}

export default Electrify
