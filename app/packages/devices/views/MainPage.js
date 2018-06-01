import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import DeviceIDContextProvider from 'electricui-components/components/DeviceIDContextProvider'

import { Container, Button as SemanticButton } from 'semantic-ui-react'
/*
type Props = {
  match: {
    params: {
      deviceID: string,
    },
  },
}*/

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
