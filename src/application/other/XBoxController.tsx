import React from 'react'
import { Printer } from '@electricui/components-desktop'
import { Message } from '@electricui/core'
import {
  withDeviceManager,
  InjectedDeviceManagerProps,
  withDeviceID,
  InjectedDeviceIDProps,
  UI_EVENTS,
} from '@electricui/components-core'

class CanvasTest extends React.Component<
  InjectedDeviceManagerProps & InjectedDeviceIDProps
> {
  canvasRef = React.createRef<HTMLCanvasElement>()

  animationFrameRequestHandle: number = 0

  store: {
    [key: string]: number
  } = {}

  dirty: boolean = false
  lastDraw: number = 0

  componentDidMount() {
    const { deviceManager } = this.props

    deviceManager.on(UI_EVENTS.COMMITTED, this.receiveMessage) // prettier-ignore

    this.animationFrameRequestHandle = requestAnimationFrame(this.updateState)
  }

  componentWillUnmount() {
    const { deviceManager } = this.props

    cancelAnimationFrame(this.animationFrameRequestHandle)

    deviceManager.removeListener(UI_EVENTS.COMMITTED, this.receiveMessage) // prettier-ignore
  }

  redraw = () => {
    const c = this.canvasRef.current

    const x1 = this.store.leftThumbHorizontal || 0
    const y1 = this.store.leftThumbVertical || 0
    const x2 = this.store.rightThumbHorizontal || 0
    const y2 = this.store.rightThumbVertical || 0

    const ctx = c.getContext('2d')

    ctx.clearRect(0, 0, 200, 200)

    ctx.beginPath()
    ctx.moveTo(100 + x1 * 100, 100 + y1 * 100)
    ctx.lineTo(100 + x2 * 100, 100 + y2 * 100)
    ctx.stroke()

    this.dirty = false
  }

  receiveMessage = (message: Message) => {
    const { deviceID } = this.props
    if (message.metadata.internal) return

    if (
      message.messageID !== 'leftThumbVertical' &&
      message.messageID !== 'leftThumbHorizontal' &&
      message.messageID !== 'rightThumbVertical' &&
      message.messageID !== 'rightThumbHorizontal'
    ) {
      return
    }

    if (message.deviceID !== deviceID) {
      return
    }

    this.store[message.messageID] = message.payload
    this.dirty = true
  }

  updateState = (time: number) => {
    this.animationFrameRequestHandle = requestAnimationFrame(this.updateState)

    this.redraw()
  }

  render() {
    return <canvas ref={this.canvasRef} width={200} height={200} />
  }
}

const CanvasTestWithDeviceManager = withDeviceManager(withDeviceID(CanvasTest))

export default class XBoxController extends React.Component {
  render() {
    const sticks = [
      'leftThumbHorizontal',
      'leftThumbVertical',
      'rightThumbHorizontal',
      'rightThumbVertical',
      'leftTrigger',
      'rightTrigger',
    ]

    const buttons = [
      'dUp',
      'dDown',
      'dLeft',
      'dRight',
      'a',
      'b',
      'x',
      'y',
      'leftBumper',
      'rightBumper',
      'hambuger',
      'thumbLeftPressed',
      'thumbRightPressed',
      'windows',
      'xbox',
    ]

    return (
      <React.Fragment>
        <CanvasTestWithDeviceManager />

        {/* 
        <ul>
          {sticks.map(key => (
            <li key={key}>
              {key}: <Printer accessor={state => state[key].toFixed(2)} />
            </li>
          ))}

          {buttons.map(key => (
            <li key={key}>
              {key}: <Printer accessor={state => state[key] && 'pressed'} />
            </li>
          ))}
        </ul>*/}
      </React.Fragment>
    )
  }
}
