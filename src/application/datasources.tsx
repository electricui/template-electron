import { DataSource, TimeSeriesFactory } from '@electricui/core-timeseries'

import { DeviceID } from '@electricui/core'

/**
 * sourceFactory takes events from the device and turns them into 'data sources'. They are essentially component accessors that happen on the event stream.
 */
export function sourceFactory(device: DeviceID): DataSource[] {
  return [
    /**
     * The LED State
     */
    new DataSource({
      name: 'led_state',
      maxItems: 10000,
    }),
  ]
}

export function timeseriesFactories(device: DeviceID): TimeSeriesFactory[] {
  return [new TimeSeriesFactory('led_state', ['led_state'])]
}
