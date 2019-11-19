import { Card } from '@blueprintjs/core'
import { Chart } from '@electricui/components-desktop-charts'
import { Composition } from 'atomic-layout'
import { IntervalRequester } from '@electricui/components-core'
import { LightBulb } from '../../components/LightBulb'
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Slider } from '@electricui/components-desktop-blueprint'

const areas = `
  ChartArea ChartArea
  LightArea SliderArea
`

export const OverviewPage = (props: RouteComponentProps) => {
  return (
    <React.Fragment>
      <IntervalRequester interval={200} variables={['led_state']} />

      <Composition areas={areas}>
        {({ ChartArea, LightArea, SliderArea }) => (
          <React.Fragment>
            <ChartArea>
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
            </ChartArea>

            <LightArea>
              <LightBulb
                containerStyle={{ margin: '20px auto', width: '80%' }}
                width="40vw"
              />
            </LightArea>

            <SliderArea>
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
            </SliderArea>
          </React.Fragment>
        )}
      </Composition>
    </React.Fragment>
  )
}
