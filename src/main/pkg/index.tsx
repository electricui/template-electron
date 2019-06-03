import {
  app,
  ipcMain,
  BrowserWindow,
  IpcMessageEvent,
  WebContents,
} from 'electron'
import { join as pathJoin } from 'path'
import { format as formatUrl } from 'url'

// global reference to electricWindow (necessary to prevent window from being garbage collected)

let electricWindow: BrowserWindow | null = null

const isDevelopment = process.env.NODE_ENV !== 'production'

function createElectricWindow() {
  const window = new BrowserWindow({
    show: false,
    width: 1500,
    height: 800,

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

let transportIPCPath: string | null = null

function sendTransportPath(windowWebContents: Array<WebContents>) {
  for (const webContents of windowWebContents) {
    if (webContents) {
      webContents.send('transport-ipc-path', transportIPCPath)
    }
  }
}

export default function setupElectricUIHandlers(
  mainWindows: Array<BrowserWindow>,
) {
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

  let resolveHasIPCPath: (() => void) | null = null

  const hasIPCPath = new Promise((resolve, reject) => {
    resolveHasIPCPath = resolve
  })

  // set the transport IPC path
  ipcMain.on(
    'set-transport-ipc-path',
    (event: IpcMessageEvent, path: string) => {
      transportIPCPath = path

      // resolve the promise, all the windows that have been asking will receive it now
      if (resolveHasIPCPath != null) {
        resolveHasIPCPath()
      }

      // send it to the main window

      sendTransportPath(mainWindows.map(window => window.webContents))
    },
  )

  // set the transport IPC path
  ipcMain.on(
    'get-transport-ipc-path',
    async (event: IpcMessageEvent, path: string) => {
      await hasIPCPath

      sendTransportPath([event.sender])
    },
  )

  // open the debug window on command
  ipcMain.on('open-debug-window', () => {
    if (electricWindow) {
      electricWindow.show()
      electricWindow.webContents.openDevTools({
        mode: 'undocked',
      })
    }
  })

  // open the debug window dev tools on command
  ipcMain.on('open-debug-window-dev-tools', () => {
    for (const window of mainWindows) {
      if (window) {
        window.webContents.openDevTools({
          mode: 'undocked',
        })
      }
    }
  })
}
