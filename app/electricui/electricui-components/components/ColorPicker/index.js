import React, { Component } from 'react'

import { AlphaPicker, HuePicker } from 'react-color'

import Electrify from 'electricui-components/components/Electrify'

import { getDependencyProps, accessState } from 'electricui-components/utils'
/*
type Props = {
  write: func,
  red: string,
  green: string,
  blue: string,
  alpha: string,
  alphaMultiplier: number,
  continuous: boolean
}
*/
class ElectricColorPicker extends Component {
  handleChangeComplete = color => {
    const { write, red, green, blue, alpha, alphaMultiplier } = this.props

    if (color.rgb.a !== undefined && alpha) {
      write(
        {
          [red]: color.rgb.r,
          [green]: color.rgb.g,
          [blue]: color.rgb.b,
          [alpha]: color.rgb.a * (alphaMultiplier || 1),
        },
        true,
      )
    } else {
      write(
        {
          [red]: color.rgb.r,
          [green]: color.rgb.g,
          [blue]: color.rgb.b,
        },
        true,
      )
    }
  }

  handleChange = color => {
    const {
      write,
      red,
      green,
      blue,
      alpha,
      alphaMultiplier,
      continuous,
    } = this.props

    if (color.rgb.a !== undefined && alpha) {
      write(
        {
          [red]: color.rgb.r,
          [green]: color.rgb.g,
          [blue]: color.rgb.b,
          [alpha]: color.rgb.a * (alphaMultiplier || 1),
        },
        continuous, // push
        false, // no ack
      )
    } else {
      write(
        {
          [red]: color.rgb.r,
          [green]: color.rgb.g,
          [blue]: color.rgb.b,
        },
        continuous, // push
        false, // no ack
      )
    }
  }

  render() {
    const { red, green, blue, alpha, alphaMultiplier } = this.props

    const color = {
      r: accessState(this.props, red),
      g: accessState(this.props, green),
      b: accessState(this.props, blue),
      a: alpha
        ? accessState(this.props, alpha) / (alphaMultiplier || 1)
        : undefined,
    }

    const restAlpha = getDependencyProps(AlphaPicker, this.props)
    const restHue = getDependencyProps(HuePicker, this.props)

    return (
      <div>
        <HuePicker
          color={color}
          onChangeComplete={this.handleChangeComplete}
          onChange={this.handleChange}
          {...restHue}
        />
        <br />
        {alpha ? (
          <AlphaPicker
            color={color}
            onChangeComplete={this.handleChangeComplete}
            onChange={this.handleChange}
            {...restAlpha}
          />
        ) : null}
      </div>
    )
  }
}

export default Electrify(ElectricColorPicker)
