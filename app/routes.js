import React from 'react'

import { Switch, Route } from 'react-router'
import Layout from 'layout/views/Layout'
import ConnectionPage from 'connections/views/ConnectionPage'
import MainPage from 'devices/views/MainPage'
import Header from 'layout/components/Header'
import Footer from 'layout/components/Footer'

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
