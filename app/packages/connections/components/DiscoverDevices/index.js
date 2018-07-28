import * as deviceActions from 'electricui-state/device'

import React, { PureComponent } from 'react'

import { Button } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(deviceActions, dispatch)
}

export default connect(
  null,
  mapDispatchToProps,
)(DiscoverDevices)
