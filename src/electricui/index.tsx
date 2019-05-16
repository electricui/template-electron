import { ipcRenderer } from 'electron'
import React from 'react'
import ReactDOM from 'react-dom'

import { setupProxyServer } from '@electricui/components-core'

import deviceManager from './config'
import DebugInterface from './DebugInterface'

const root = document.createElement('div')
document.body.appendChild(root)

// TODO: Figure out why the webpack env isn't taking
declare const module: any

const server = setupProxyServer(deviceManager)

console.log('Rendering Debug Interface')

ReactDOM.render(<DebugInterface />, root)

if (module.hot) {
  module.hot.accept('./DebugInterface', () => {
    const NextDebugInterface = require('./DebugInterface').default
    ReactDOM.render(<NextDebugInterface />, root)
  })
}

console.log('rendered the debug interface')

ipcRenderer.send('open-debug-window-dev-tools')
