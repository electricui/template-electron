import { DeviceID } from '@electricui/core'

import {
  TimeSeriesFactory,
  DataStoreEventSelector,
  DataSource,
} from '@electricui/components-desktop-charts'

/**
 * sourceFactory takes events from the device and turns them into 'data sources'. They are essentially component accessors that happen on the event stream.
 */
export function sourceFactory(device: DeviceID): DataSource[] {
  return [
    new DataSource(
      'led_state',
      new DataStoreEventSelector({
        filter: message => message.messageID === 'led_state',
        processor: message => message.payload,
      }),
    ),
  ]
}

export function timeseriesFactories(device: DeviceID): TimeSeriesFactory[] {
  return [
    // simplest case, just combines some data sources into a TimeSeries
    new TimeSeriesFactory('led_state', ['led_state']),
  ]
}
