import React, { Component } from 'react'
import { Node } from 'gl-react'

import Electrify from 'electricui-components/components/Electrify'

import { accessState } from 'electricui-components/utils'
import raf from 'raf'
/*
type Props = {
  uniforms: object,
  constantUniforms: object,
  shader: object,
  hardware: boolean,
  injectTime: string,
  paused: boolean,
  refreshRate: number
}
*/
class WebGLNode extends Component {
  constructor(props) {
    super(props)
    this.state = { time: 0, tick: 0 }
  }

  componentDidMount() {
    this.onPausedChange(this.props.paused)
  }

  componentWillReceiveProps({ paused }) {
    if (this.props.paused !== paused) {
      this.onPausedChange(paused)
    }
  }

  componentWillUnmount() {
    raf.cancel(this.requestedAnimationFrame)
  }

  startLoop = () => {
    const { refreshRate = 60, injectTime } = this.props

    if (!injectTime) {
      return
    }

    let startTime
    let lastTime

    const interval = 1000 / refreshRate
    lastTime = -interval

    const loop = t => {
      this.requestedAnimationFrame = raf(loop)
      if (!startTime) {
        startTime = t
      }
      if (t - lastTime > interval) {
        lastTime = t
        this.setState({
          time: (t - startTime) / 1000,
          tick: this.state.tick + 1,
        })
      }
    }

    this.requestedAnimationFrame = raf(loop)
  }

  onPausedChange = paused => {
    if (paused) {
      raf.cancel(this.requestedAnimationFrame)
    } else {
      this.startLoop()
    }
  }

  render() {
    const {
      uniforms = {},
      shader,
      hardware,
      injectTime,
      constantUniforms = {},
    } = this.props

    const uniformInjection = constantUniforms

    for (const key of Object.keys(uniforms)) {
      uniformInjection[key] = accessState(this.props, uniforms[key], hardware)
    }

    if (injectTime) {
      uniformInjection[injectTime] = this.state.time
    }

    return <Node shader={shader} uniforms={uniformInjection} />
  }
}

export default Electrify(WebGLNode)
