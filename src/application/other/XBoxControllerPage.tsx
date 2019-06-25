import React from 'react'

import { Button as BlueprintButton } from '@blueprintjs/core'

import { navigate, RouteComponentProps } from '@reach/router'

import XBoxController from './XBoxController'
import { Chart } from '@electricui/components-desktop-charts'

const XBoxControllerPage = (props: RouteComponentProps) => (
  <div className="connection-page">
    leftRightTrigger
    <Chart
      timeseriesKey="leftRightTrigger"
      duration={20000}
      delay={1}
      hideLegend={true}
      yMin={0}
      yMax={1}
      height={250}
      width={900}
    />
    <br />
    <br />
    leftRightTriggerWithDerivatives
    <br />
    <br />
    leftRightTriggerAggregations
    <br />
    <br />
    <XBoxController />
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

export default XBoxControllerPage
