import React from 'react'

import darkOn from './dark-on.png'
import darkOff from './dark-off.png'
import brightOn from './bright-on.png'
import brightOff from './bright-off.png'
import { ImageSwitcher } from '@electricui/components-desktop'
import { useDarkMode } from '@electricui/components-desktop'
import { useHardwareState } from '@electricui/components-core'

type LightBulbProps = {
  style: React.CSSProperties
}

const LightBulb = (props: LightBulbProps) => {
  const isOn = useHardwareState('led_state')
  const isDarkMode = useDarkMode()

  const images = [darkOn, darkOff, brightOn, brightOff]

  let image = 0
  if (isDarkMode) {
    if (isOn) {
      image = 0
    } else {
      image = 1
    }
  } else {
    if (isOn) {
      image = 2
    } else {
      image = 3
    }
  }

  return <ImageSwitcher images={images} active={image} style={props.style} />
}

export default LightBulb
