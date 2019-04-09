import React from 'react'

import { NonIdealState, ProgressBar } from '@blueprintjs/core'

import { RouteComponentProps } from '@reach/router'

import {
  DeviceHandshakeProgress,
  DeviceHandshakeProgressIDs,
  DeviceIDContext,
} from '@electricui/components-core'

const DeviceLoadingPage = (props: RouteComponentProps) => (
  <div style={{ height: '100vh' }}>
    <NonIdealState
      icon="changes"
      title="Connecting"
      description={
        <DeviceIDContext.Consumer>
          {deviceID => (
            <DeviceHandshakeProgressIDs deviceID={deviceID}>
              {handshakeProgressIDs =>
                handshakeProgressIDs.map(progressID => (
                  <div key={progressID}>
                    <DeviceHandshakeProgress
                      deviceID={deviceID}
                      deviceHandshakeID={progressID}
                    >
                      {(currentTask, complete, total) => (
                        <div
                          style={{
                            minWidth: 400,
                          }}
                        >
                          {currentTask}
                          <br />
                          <br />
                          <ProgressBar
                            value={total === 0 ? 0 : complete / total}
                          />
                        </div>
                      )}
                    </DeviceHandshakeProgress>
                  </div>
                ))
              }
            </DeviceHandshakeProgressIDs>
          )}
        </DeviceIDContext.Consumer>
      }
    />
  </div>
)

export default DeviceLoadingPage
