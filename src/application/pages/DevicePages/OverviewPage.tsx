import React from 'react'
import { RouteComponentProps } from '@reach/router'
import {
  ProgressBar,
  Slider,
  Button,
} from '@electricui/components-desktop-blueprint'
import { Printer } from '@electricui/components-desktop'
import { Card, Divider, ButtonGroup, Label, Text } from '@blueprintjs/core'
import { Grid, Cell } from 'styled-css-grid'
import { Chart } from '@electricui/components-desktop-charts'
import { useDarkMode } from '@electricui/components-desktop'
import {
  IntervalRequester,
  useHardwareState,
  StateTree,
} from '@electricui/components-core'
import LightBulb from '../../components/Lightbulb'

const BlinkIndicator = () => {
  const isBlinking = useHardwareState<boolean>('led_blink')
  if (isBlinking) {
    return <div>blinking</div>
  }

  return <div>not blinking</div>
}

const OverviewPage = (props: RouteComponentProps) => {
  return (
    <React.Fragment>
      <Grid columns={1}>
        <Cell>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: '1em' }}>
              <b>LED State</b>
            </div>

            <Chart
              timeseriesKey="led_state"
              duration={28000}
              delay={0}
              hideLegend={true}
              yMin={0}
              yMax={1}
              height={200}
            />

            <IntervalRequester interval={200} variables={['led_state']} />
          </Card>
        </Cell>
        <Grid columns={2}>
          <Cell>
            <LightBulb
              style={{ maxWidth: 200, display: 'block', margin: '20px auto' }}
            />
          </Cell>
          <Cell>
            <Card>
              <Text>
                Lit time: <Printer accessor="lit_time" />
              </Text>
              <div style={{ margin: 20 }}>
                <Slider
                  min={20}
                  max={1020}
                  stepSize={10}
                  labelStepSize={100}
                  sendOnlyOnRelease
                >
                  <Slider.Handle accessor="lit_time" />
                </Slider>
              </div>
              <Grid columns={3}>
                <Cell>
                  <Button writer={{ led_blink: 1 }}>Turn on blinking</Button>
                </Cell>
                <Cell style={{ textAlign: 'center' }}>
                  <BlinkIndicator />
                </Cell>
                <Cell style={{ textAlign: 'right' }}>
                  <Button writer={{ led_blink: 0 }}>Turn off blinking</Button>
                </Cell>
              </Grid>
            </Card>
          </Cell>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default OverviewPage
