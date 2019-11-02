import 'mocha'

import * as chai from 'chai'
import * as fs from 'fs'
import * as path from 'path'

import { Application } from 'spectron'

const assert = chai.assert

const appPath = path.join(__dirname, '..')

let app: Application

const electronPathCalculated = (require('electron') as unknown) as string

describe('Basic Integration Test', function() {
  this.timeout(10000)

  beforeEach(() => {
    app = new Application({
      path: electronPathCalculated,
      args: [appPath],
    })

    return app.start()
  })

  afterEach(() => {
    if (app && app.isRunning()) {
      return app.stop()
    }
  })

  it('Can take a screenshot', function() {
    return app.client.waitUntilWindowLoaded().then(async () => {
      // Set the window size
      app.browserWindow.setSize(1920, 1080, false)

      // Take a screenshot for validation
      const screenshotPath = path.join(__dirname, 'screenshots')
      await app.browserWindow.capturePage().then(imageBuffer => {
        return fs.promises.writeFile(
          path.join(screenshotPath, 'page.png'),
          imageBuffer,
        )
      })
    })
  })

  it('Found a device', function() {
    return app.client.waitUntilWindowLoaded().then(async () => {
      const connectionList = app.client.$('.eui-connections-list')

      const connectionPageTextObj = await connectionList.getText()
      const connectionPageText = connectionPageTextObj.toString()

      // Print the connection page text to console
      console.log(connectionPageText)

      // Make sure the connection page contains a device
      assert.isTrue(connectionPageText.includes('Device information!'))
    })
  })
})
