import './connection-page.css'

import { ipcRenderer } from 'electron'
import React from 'react'

import { Button } from '@blueprintjs/core'
import { Connections } from '@electricui/components-desktop-blueprint'
import { navigate, RouteComponentProps } from '@reach/router'

const ConnectionPage = (props: RouteComponentProps) => (
  <React.Fragment>
    <div style={{ height: '100vh' }}>
      <Connections onConnect={deviceID => navigate(`/devices/${deviceID}`)} />
    </div>
    <Button
      onClick={() => {
        ipcRenderer.send('open-debug-window')
      }}
      style={{ position: 'fixed', bottom: 10, right: 10 }}
    >
      Show transport window
    </Button>
  </React.Fragment>
)

export default ConnectionPage
