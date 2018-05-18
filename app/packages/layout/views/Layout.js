// @flow
import React, { Component } from 'react'

type Props = {
  children: React.Node
}

export default class Layout extends Component<Props> {
  props: Props

  render() {
    return <div>{this.props.children}</div>
  }
}
