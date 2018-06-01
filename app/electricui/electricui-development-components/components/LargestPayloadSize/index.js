import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as DevActions from 'electricui-state/dev'
/*
type Props = { largestPacketLength: number }
*/
class LargestPayloadSize extends Component {
  render() {
    const { largestPacketLength } = this.props

    return <span>Largest Payload Size: {largestPacketLength} bytes.</span>
  }
}

// then we grab the state out of redux, memoise it and pass it down
function mapStateToProps(state) {
  return {
    largestPacketLength: DevActions.getLargestPayloadLength(state),
  }
}

export default connect(mapStateToProps)(LargestPayloadSize)
