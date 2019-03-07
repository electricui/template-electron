import { ipcRenderer } from 'electron'
import React from 'react'

export default class ShowTransportWindowDevTools extends React.Component {
  onClick = () => {
    ipcRenderer.send('open-debug-window-dev-tools')
    console.log('attempted to open dev tools')
  }

  render() {
    return (
      <div className="Switch" onClick={this.onClick}>
        Show Transport Window Dev Tools
      </div>
    )
  }
}
