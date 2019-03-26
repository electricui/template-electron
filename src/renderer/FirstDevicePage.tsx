import React from 'react'

import { Button as BlueprintButton } from '@blueprintjs/core'
import { IntervalRequester } from '@electricui/components-core'
import { Printer } from '@electricui/components-desktop'
import {
  Button,
  Checkbox,
  NumberInput,
  RadioGroup,
  Slider,
  Switch,
  TextInput,
} from '@electricui/components-desktop-blueprint'
import { navigate, RouteComponentProps } from '@reach/router'

const FirstDevicePage = (props: RouteComponentProps) => (
  <div className="connection-page">
    <IntervalRequester variables={['led_state', 'led_blink']} interval={200} />
    <p>If it's a real device:</p>
    led_state: <Printer accessor="led_state" />
    <br />
    led_blink: <Printer accessor="led_blink" />
    <br />
    lit_time: <Printer accessor="lit_time" />
    <br />
    <Button writer={{ led_blink: 1 }}>Turn Blink On</Button>
    <Button writer={{ led_blink: 0 }}>Turn Blink Off</Button>
    <Checkbox checked={{ led_blink: 1 }} unchecked={{ led_blink: 0 }}>
      Blink State
    </Checkbox>
    <Checkbox checked={{ led_blink: 1 }} unchecked={{ led_blink: 2 }}>
      Blink State With Indeterminate
    </Checkbox>
    <RadioGroup accessor="led_blink" label="Led Blink">
      <RadioGroup.Radio value={0} label="Zero" />
      <RadioGroup.Radio value={1} label="One" />
    </RadioGroup>
    <TextInput accessor="name" />
    <NumberInput accessor="lit_time" />
    <Switch unchecked={{ led_blink: 0 }} checked={{ led_blink: 1 }}>
      Blink State With Indeterminate
    </Switch>
    <br />
    <br />
    <Slider
      min={0}
      max={1000}
      stepSize={1}
      labelStepSize={100}
      sendOnlyOnRelease
    >
      <Slider.Handle accessor="lit_time" />
    </Slider>
    <br />
    <br />
    <BlueprintButton
      onClick={() => {
        navigate('/')
      }}
    >
      Back
    </BlueprintButton>
  </div>
)

export default FirstDevicePage
