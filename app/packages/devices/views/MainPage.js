import { Container, Button as SemanticButton } from 'semantic-ui-react'
import React, { PureComponent } from 'react'

import { DeviceIDContextProvider } from '@electricui/components'
import { Link } from 'react-router-dom'

class MainPage extends PureComponent {
  render() {
    const deviceID = this.props.match.params.deviceID

    return (
      <DeviceIDContextProvider deviceID={deviceID}>
        <Container style={{ margin: '0 auto' }}>
          <h2 style={{ paddingTop: 150, textAlign: 'center' }}>{deviceID}</h2>
          This is a device page
          <br />
          <Link to="/">
            <SemanticButton>Back</SemanticButton>
          </Link>
        </Container>
      </DeviceIDContextProvider>
    )
  }
}

export default MainPage
