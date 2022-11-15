import 'source-map-support/register'

import React from 'react'
import ReactDOM from 'react-dom'
import { Root } from './Root'
import { store } from './state'
import { setupDarkModeListenersRenderer } from '@electricui/utility-electron'

setupDarkModeListenersRenderer()

let root = document.createElement('div')
root.className = 'root'
document.body.appendChild(root)

function render(Component: any) {
  ReactDOM.render(<Component store={store} />, root)
}

render(Root)
