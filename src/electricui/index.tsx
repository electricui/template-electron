import { ipcRenderer } from 'electron'
import React from 'react'
import ReactDOM from 'react-dom'

import { setupProxyServer } from '@electricui/components-core'

import deviceManager from './config'
import DebugInterface from './DebugInterface'

const root = document.createElement('div')
document.body.appendChild(root)

const server = setupProxyServer(deviceManager)

console.log('Rendering Debug Interface')

ReactDOM.render(<DebugInterface />, root)

if ((module as any).hot) {
  const mod = module as any // Fix weird prettier bug where it prepends a ;
  mod.hot.accept('./DebugInterface', () => {
    const NextDebugInterface = require('./DebugInterface').default
    ReactDOM.render(<NextDebugInterface />, root)
  })
}

console.log('rendered the debug interface')

ipcRenderer.send('open-debug-window-dev-tools')
