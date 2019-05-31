import { DeviceID } from '@electricui/core'

import { TimeSeriesFactory, DataSource } from '@electricui/core-timeseries'

/**
 * sourceFactory takes events from the device and turns them into 'data sources'. They are essentially component accessors that happen on the event stream.
 */
export function sourceFactory(device: DeviceID): DataSource[] {
  return [
    new DataSource({
      name: 'led_state',
    }),
  ]
}

export function timeseriesFactories(device: DeviceID): TimeSeriesFactory[] {
  return [
    // simplest case, just combines some data sources into a TimeSeries
    new TimeSeriesFactory('led_state', ['led_state']),
  ]
}
