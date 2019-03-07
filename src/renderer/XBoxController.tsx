import React from 'react'
import { connect } from 'react-redux'

import { withDeviceID } from '@electricui/components-core'
import { getCommittedState, ElectricUIState, ReactReduxContext } from '@electricui/core-redux-state'

type XboxControllerProps = {}

type InjectedXboxControllerProps = {
  leftThumbHorizontal: number
  leftThumbVertical: number
  rightThumbHorizontal: number
  rightThumbVertical: number
  leftTriggerRaw: number
  leftTrigger: number
  leftTriggerOneQuarter: boolean
  leftTriggerTwoQuarterPress: boolean
  leftTriggerThreeQuarterPress: boolean
  rightTriggerRaw: number
  rightTrigger: number
  rightTriggerOneQuarter: boolean
  rightTriggerTwoQuarterPress: boolean
  rightTriggerThreeQuarterPress: boolean
  dUp: boolean
  dDown: boolean
  dLeft: boolean
  dRight: boolean
  a: boolean
  b: boolean
  x: boolean
  y: boolean
  leftBumper: boolean
  rightBumper: boolean
  hambuger: boolean
  thumbLeftPressed: boolean
  thumbRightPressed: boolean
  windows: boolean
  xbox: boolean
  deviceID: string
}

class XBoxController extends React.Component<
  XboxControllerProps & InjectedXboxControllerProps
> {
  static defaultProps = {
    leftThumbHorizontal: 0,
    leftThumbVertical: 0,
    rightThumbHorizontal: 0,
    rightThumbVertical: 0,
    leftTriggerRaw: 0,
    leftTrigger: 0,
    leftTriggerOneQuarter: false,
    leftTriggerTwoQuarterPress: false,
    leftTriggerThreeQuarterPress: false,
    rightTriggerRaw: 0,
    rightTrigger: 0,
    rightTriggerOneQuarter: false,
    rightTriggerTwoQuarterPress: false,
    rightTriggerThreeQuarterPress: false,
    dUp: false,
    dDown: false,
    dLeft: false,
    dRight: false,
    a: false,
    b: false,
    x: false,
    y: false,
    leftBumper: false,
    rightBumper: false,
    hambuger: false,
    thumbLeftPressed: false,
    thumbRightPressed: false,
    windows: false,
    xbox: false,
  }

  render() {
    const {
      leftThumbHorizontal,
      leftThumbVertical,
      rightThumbHorizontal,
      rightThumbVertical,
      leftTriggerRaw,
      leftTrigger,
      leftTriggerOneQuarter,
      leftTriggerTwoQuarterPress,
      leftTriggerThreeQuarterPress,
      rightTriggerRaw,
      rightTrigger,
      rightTriggerOneQuarter,
      rightTriggerTwoQuarterPress,
      rightTriggerThreeQuarterPress,
      dUp,
      dDown,
      dLeft,
      dRight,
      a,
      b,
      x,
      y,
      leftBumper,
      rightBumper,
      hambuger,
      thumbLeftPressed,
      thumbRightPressed,
      windows,
      xbox,
    } = this.props

    return (
      <React.Fragment>
        <ul>
          <li>
            leftThumbHorizontal:{' '}
            {leftThumbHorizontal ? leftThumbHorizontal : null}
          </li>
          <li>leftThumbVertical: {leftThumbVertical}</li>
          <li>rightThumbHorizontal: {rightThumbHorizontal} </li>
          <li>rightThumbVertical: {rightThumbVertical}</li>
          <li>leftTriggerRaw: {leftTriggerRaw}</li>
          <li>leftTrigger: {leftTrigger}</li>
          <li>
            leftTriggerOneQuarter: {leftTriggerOneQuarter ? 'pressed' : null}{' '}
          </li>
          <li>
            leftTriggerTwoQuarterPress:{' '}
            {leftTriggerTwoQuarterPress ? 'pressed' : null}{' '}
          </li>
          <li>
            leftTriggerThreeQuarterPress:{' '}
            {leftTriggerThreeQuarterPress ? 'pressed' : null}{' '}
          </li>
          <li>rightTriggerRaw: {rightTriggerRaw}</li>
          <li>rightTrigger: {rightTrigger}</li>
          <li>
            rightTriggerOneQuarter: {rightTriggerOneQuarter ? 'pressed' : null}{' '}
          </li>
          <li>
            rightTriggerTwoQuarterPress:{' '}
            {rightTriggerTwoQuarterPress ? 'pressed' : null}{' '}
          </li>
          <li>
            rightTriggerThreeQuarterPress:{' '}
            {rightTriggerThreeQuarterPress ? 'pressed' : null}{' '}
          </li>
          <li>dUp: {dUp ? 'pressed' : null}</li>
          <li>dDown: {dDown ? 'pressed' : null}</li>
          <li>dLeft: {dLeft ? 'pressed' : null}</li>
          <li>dRight: {dRight ? 'pressed' : null}</li>
          <li>a: {a ? 'pressed' : null}</li>
          <li>b: {b ? 'pressed' : null}</li>
          <li>x: {x ? 'pressed' : null}</li>
          <li>y: {y ? 'pressed' : null}</li>
          <li>leftBumper: {leftBumper ? 'pressed' : null}</li>
          <li>rightBumper: {rightBumper ? 'pressed' : null}</li>
          <li>hambuger: {hambuger ? 'pressed' : null}</li>
          <li>thumbLeftPressed: {thumbLeftPressed ? 'pressed' : null}</li>
          <li>thumbRightPressed: {thumbRightPressed ? 'pressed' : null}</li>
          <li>windows: {windows ? 'pressed' : null}</li>
          <li>xbox: {xbox ? 'pressed' : null}</li>
        </ul>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (
  state: ElectricUIState,
  ownProps: InjectedXboxControllerProps,
) => ({
  leftThumbHorizontal: getCommittedState(
    state,
    ownProps.deviceID,
    'leftThumbHorizontal',
  ),
  leftThumbVertical: getCommittedState(
    state,
    ownProps.deviceID,
    'leftThumbVertical',
  ),
  rightThumbHorizontal: getCommittedState(
    state,
    ownProps.deviceID,
    'rightThumbHorizontal',
  ),
  rightThumbVertical: getCommittedState(
    state,
    ownProps.deviceID,
    'rightThumbVertical',
  ),
  leftTriggerRaw: getCommittedState(state, ownProps.deviceID, 'leftTriggerRaw'),
  leftTrigger: getCommittedState(state, ownProps.deviceID, 'leftTrigger'),
  leftTriggerOneQuarter: getCommittedState(
    state,
    ownProps.deviceID,
    'leftTriggerOneQuarter',
  ),
  leftTriggerTwoQuarterPress: getCommittedState(
    state,
    ownProps.deviceID,
    'leftTriggerTwoQuarterPress',
  ),
  leftTriggerThreeQuarterPress: getCommittedState(
    state,
    ownProps.deviceID,
    'leftTriggerThreeQuarterPress',
  ),
  rightTriggerRaw: getCommittedState(
    state,
    ownProps.deviceID,
    'rightTriggerRaw',
  ),
  rightTrigger: getCommittedState(state, ownProps.deviceID, 'rightTrigger'),
  rightTriggerOneQuarter: getCommittedState(
    state,
    ownProps.deviceID,
    'rightTriggerOneQuarter',
  ),
  rightTriggerTwoQuarterPress: getCommittedState(
    state,
    ownProps.deviceID,
    'rightTriggerTwoQuarterPress',
  ),
  rightTriggerThreeQuarterPress: getCommittedState(
    state,
    ownProps.deviceID,
    'rightTriggerThreeQuarterPress',
  ),
  dUp: getCommittedState(state, ownProps.deviceID, 'dUp'),
  dDown: getCommittedState(state, ownProps.deviceID, 'dDown'),
  dLeft: getCommittedState(state, ownProps.deviceID, 'dLeft'),
  dRight: getCommittedState(state, ownProps.deviceID, 'dRight'),
  a: getCommittedState(state, ownProps.deviceID, 'a'),
  b: getCommittedState(state, ownProps.deviceID, 'b'),
  x: getCommittedState(state, ownProps.deviceID, 'x'),
  y: getCommittedState(state, ownProps.deviceID, 'y'),
  leftBumper: getCommittedState(state, ownProps.deviceID, 'leftBumper'),
  rightBumper: getCommittedState(state, ownProps.deviceID, 'rightBumper'),
  hambuger: getCommittedState(state, ownProps.deviceID, 'hambuger'),
  thumbLeftPressed: getCommittedState(
    state,
    ownProps.deviceID,
    'thumbLeftPressed',
  ),
  thumbRightPressed: getCommittedState(
    state,
    ownProps.deviceID,
    'thumbRightPressed',
  ),
  windows: getCommittedState(state, ownProps.deviceID, 'windows'),
  xbox: getCommittedState(state, ownProps.deviceID, 'xbox'),
})

export default withDeviceID(
  connect(
    mapStateToProps,
    null,
    null,
    {
      context: ReactReduxContext,
    },
  )(XBoxController),
)
