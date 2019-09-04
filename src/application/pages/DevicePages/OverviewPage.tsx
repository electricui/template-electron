import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Card } from '@blueprintjs/core'
import { Grid, Cell } from 'styled-css-grid'

import { IntervalRequester } from '@electricui/components-core'
import { Slider } from '@electricui/components-desktop-blueprint'
import { Chart } from '@electricui/components-desktop-charts'

import { LightBulb } from '../../components/LightBulb'

export const OverviewPage = (props: RouteComponentProps) => {
  return (
    <React.Fragment>
      <IntervalRequester interval={200} variables={['led_state']} />

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
          </Card>
        </Cell>
        <Grid columns={2}>
          <Cell>
            <LightBulb
              containerStyle={{ margin: '20px auto', width: '80%' }}
              width="40vw"
            />
          </Cell>
          <Cell>
            <Card>
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
            </Card>
          </Cell>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
