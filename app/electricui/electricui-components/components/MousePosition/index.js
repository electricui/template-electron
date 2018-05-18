// @flow
import React, { Component } from 'react'

import ReactCursorPosition from 'react-cursor-position'

import Electrify from 'electricui-components/components/Electrify'

type Props = {
  write: func,
  x: string,
  y: string,
  children: element,
  xMin: number,
  yMin: number,
  xMax: number,
  yMax: number
}

class ElectricMousePosition extends Component<Props> {
  props: Props

  handleChange = changes => {
    const { write, x, y, xMin, yMin, xMax, yMax } = this.props

    if (changes.isPositionOutside) {
      return
    }

    const outputX =
      changes.position.x / changes.elementDimensions.width * (xMax - xMin) +
      xMin
    const outputY =
      changes.position.y / changes.elementDimensions.height * (yMax - yMin) +
      yMin

    write(
      {
        [x]: outputX,
        [y]: outputY
      },
      true
    )
  }

  render() {
    const { children } = this.props

    return (
      <ReactCursorPosition onPositionChanged={this.handleChange}>
        {children}
      </ReactCursorPosition>
    )
  }
}

export default Electrify(ElectricMousePosition)
