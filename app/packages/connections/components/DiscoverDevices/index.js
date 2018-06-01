import React, { PureComponent } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Button } from 'semantic-ui-react'

import * as deviceActions from 'electricui-state/device'
/*
type Props = {
  pollDiscovery: func,
  children: element,
  fluid: boolean,
  compact: boolean,
  color: string
}
*/
class DiscoverDevices extends PureComponent {
  onClick = () => {
    const { pollDiscovery } = this.props

    pollDiscovery()
  }

  render() {
    const { children, fluid, compact, color } = this.props
    return (
      <Button
        onClick={this.onClick}
        fluid={fluid}
        compact={compact}
        color={color}>
        {children}
      </Button>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(deviceActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverDevices)
