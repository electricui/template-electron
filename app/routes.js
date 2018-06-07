import { Route, Switch } from 'react-router'

import ConnectionPage from 'connections/views/ConnectionPage'
import Footer from 'layout/components/Footer'
import Header from 'layout/components/Header'
import Layout from 'layout/views/Layout'
import MainPage from 'devices/views/MainPage'
import React from 'react'

export default () => (
  <div className="app">
    <Route exact path="*" component={Header} />
    <Layout>
      <Switch>
        <Route path="/devices/:deviceID" component={MainPage} />
      </Switch>
    </Layout>
    <Route exact path="/" component={ConnectionPage} />
    <Route exact path="*" component={Footer} />
  </div>
)
