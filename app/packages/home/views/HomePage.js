// @flow
import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

import styles from './Home.css'

type Props = {}

export default class Home extends Component<Props> {
  props: Props

  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2>Congradulations it doesn{"'"}t crash</h2>
        </div>
      </div>
    )
  }
}
