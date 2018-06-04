import React, { Component } from 'react'

import { EVENT_DEVICE_HEARTBEAT_UPDATE } from '@electricui/protocol-constants'
import ReactEcharts from 'echarts-for-react'
import { getDependencyProps } from 'electricui-components/utils'

const { manager } = global.electricui

/*
type Props = {
  deviceID: string
}
*/
class ElectricLineChart extends Component {
  constructor(props) {
    super(props)

    this.data = {}
  }

  componentDidMount() {
    manager.on(EVENT_DEVICE_HEARTBEAT_UPDATE, this.add)
  }

  componentWillUnmount() {
    manager.removeListener(EVENT_DEVICE_HEARTBEAT_UPDATE, this.add)
  }

  add = (deviceID, { transportKey, averageLatency }) => {
    // lastLatency can also be grabbed
    if (deviceID !== this.props.deviceID) {
      return
    }

    // console.log(averageLatency, lastLatency, lastLatency - averageLatency)

    if (!this.data[transportKey]) {
      this.data[transportKey] = []
    }

    this.data[transportKey].push({
      value: [new Date(), averageLatency],
    })

    if (this.data[transportKey].length > 150) {
      this.data[transportKey].shift()
    }

    const echartObj = this.echarts_react.getEchartsInstance()
    const option = this.getOption()

    echartObj.setOption(option, true, false)
  }

  getOption = () => ({
    // animation: false,
    addDataAnimation: false,
    animationEasing: 'linear',
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
    },
    series: Object.keys(this.data).map(transportHash => ({
      name: transportHash,
      type: 'line',
      showSymbol: false,
      hoverAnimation: false,
      data: this.data[transportHash],
    })),
    legend: {
      data: Object.keys(this.data),
      y: 'bottom',
    },
    title: {
      text: 'Latency averages over each transport',
    },
  })

  render() {
    const rest = getDependencyProps(ReactEcharts, this.props)

    return (
      <ReactEcharts
        ref={e => {
          this.echarts_react = e
        }}
        option={this.getOption()}
        notMerge
        lazyUpdate
        {...rest}
      />
    )
  }
}

export default ElectricLineChart
