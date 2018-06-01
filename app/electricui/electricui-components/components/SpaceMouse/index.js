import React, { Component } from 'react'

import HID from 'node-hid'

import Electrify from 'electricui-components/components/Electrify'

import SpaceMouse from '@electricui/spacemouse'
/*
type Props = {
  write: func,

  x: string,
  y: string,
  z: string,

  pitch: string,
  yaw: string,
  roll: string,

  min: number,
  max: number
}
*/
class ElectricSpaceMouse extends Component {
  componentDidMount() {
    this.spaceMouse = new SpaceMouse(HID)
    this.spaceMouse.on('data', this.parseData)
  }

  componentWillUnmount() {
    this.spaceMouse.removeListener('data', this.parseData)
  }

  parseData = movement => {
    const { write, x, y, z, pitch, yaw, roll, min, max } = this.props

    const obj = {}

    if (x) {
      obj[x] = (movement.x + 1) * (max - min) / 2 + min
    }

    if (y) {
      obj[y] = (movement.y + 1) * (max - min) / 2 + min
    }

    if (z) {
      obj[z] = (movement.z + 1) * (max - min) / 2 + min
    }

    if (pitch) {
      obj[pitch] = (movement.pitch + 1) * (max - min) / 2 + min
    }

    if (yaw) {
      obj[yaw] = (movement.yaw + 1) * (max - min) / 2 + min
    }

    if (roll) {
      obj[roll] = (movement.roll + 1) * (max - min) / 2 + min
    }

    write(obj, true, true)
  }

  render() {
    return <div>This component controls a space mouuuuuuse.</div>
  }
}

export default Electrify(ElectricSpaceMouse)
