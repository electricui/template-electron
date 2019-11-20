import { Card } from '@blueprintjs/core'
import { Chart } from '@electricui/components-desktop-charts'
import { Composition } from 'atomic-layout'
import { IntervalRequester } from '@electricui/components-core'
import { LightBulb } from '../../components/LightBulb'
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Slider } from '@electricui/components-desktop-blueprint'

const layoutDescription = `
  Chart Chart
  Light Slider
`

export const OverviewPage = (props: RouteComponentProps) => {
  return (
    <React.Fragment>
      <IntervalRequester interval={200} variables={['led_state']} />

      <Composition areas={layoutDescription} gap={10} autoCols="1fr">
        {Areas => (
          <React.Fragment>
            <Areas.Chart>
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
            </Areas.Chart>

            <Areas.Light>
              <LightBulb
                containerStyle={{ margin: '20px auto', width: '80%' }}
                width="40vw"
              />
            </Areas.Light>

            <Areas.Slider>
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
            </Areas.Slider>
          </React.Fragment>
        )}
      </Composition>
    </React.Fragment>
  )
}
