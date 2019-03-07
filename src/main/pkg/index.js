import { app, BrowserWindow, ipcMain } from 'electron'
import { format as formatUrl } from 'url'
import { join as pathJoin } from 'path'

// global reference to electricWindow (necessary to prevent window from being garbage collected)
let electricWindow
const isDevelopment = process.env.NODE_ENV !== 'production'

function createElectricWindow() {
  const window = new BrowserWindow({
    show: false,

    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false, // Don't throttle since it will always be in the background.
    },
  })

  if (isDevelopment) {
    window.loadURL(
      `http://localhost:${process.env.ELECTRICUI_BUILD_TOOLS_TRANSPORT_PORT}`,
    )
  } else {
    window.loadURL(
      formatUrl({
        pathname: pathJoin(__dirname, '../transport/index.html'),
        protocol: 'file',
        slashes: true,
      }),
    )
  }

  window.on('closed', () => {
    console.log('The electric ui transport window just closed')
    electricWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  window.on('close', event => {
    // The transport window only hides, it never closes
    window.hide()

    event.preventDefault()
  })

  return window
}

let transportIPCPath = null

function sendTransportPath(mainWindows) {
  for (const window of mainWindows) {
    if (window) {
      window.send('transport-ipc-path', transportIPCPath)
    }
  }
}

export default function setupElectricUIHandlers(mainWindows) {
  app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (electricWindow === null) {
      electricWindow = createElectricWindow()
    }
  })

  // create main BrowserWindow when electron is ready
  app.on('ready', () => {
    electricWindow = createElectricWindow()
  })

  let resolveHasIPCPath = null

  const hasIPCPath = new Promise((resolve, reject) => {
    resolveHasIPCPath = resolve
  })

  // set the transport IPC path
  ipcMain.on('set-transport-ipc-path', (event, path) => {
    transportIPCPath = path

    // resolve the promise, all the windows that have been asking will receive it now
    resolveHasIPCPath()

    // send it to the main window

    sendTransportPath(mainWindows)
  })

  // set the transport IPC path
  ipcMain.on('get-transport-ipc-path', async (event, path) => {
    await hasIPCPath

    sendTransportPath([event.sender])
  })

  // open the debug window on command
  ipcMain.on('open-debug-window', (event, arg) => {
    if (electricWindow) {
      electricWindow.show()
      electricWindow.webContents.openDevTools()
    }
  })

  // open the debug window dev tools on command
  ipcMain.on('open-debug-window-dev-tools', (event, arg) => {
    for (const window of mainWindows) {
      if (window) {
        window.webContents.openDevTools()
      }
    }
  })
}
