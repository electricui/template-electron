import 'normalize.css/normalize.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@electricui/components-desktop-blueprint/lib/bundle.css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'

import { configureStore } from './packages/state'
import Root from './Root'

let root = document.createElement('div')
document.body.appendChild(root)

const store = configureStore()

function render(Component: any) {
  ReactDOM.render(<Component store={store} />, root)
}

render(Root)

const mod = module as any

if (mod.hot) {
  mod.hot.accept('./Root', () => {
    const NextRoot = require('./Root').default
    render(NextRoot)
  })
}
