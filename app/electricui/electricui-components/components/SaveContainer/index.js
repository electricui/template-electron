import React, { Component } from 'react'

import SaveContainerContext from './provider'
/*
type Props = {
  children: element
}*/

export default class SaveContainer extends Component {
  constructor(props) {
    super(props)

    this.messageIDs = new Set()
  }

  register = messageIDs => {
    // we only want the messageIDs, not the dot notation keys
    for (const key of messageIDs) {
      this.messageIDs.add(key.split('.')[0])
    }
  }

  render() {
    const { children } = this.props

    return (
      <SaveContainerContext.Provider value={this}>
        {children}
      </SaveContainerContext.Provider>
    )
  }
}
