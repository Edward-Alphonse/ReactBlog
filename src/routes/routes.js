import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Index from '../pages/main/main'
import FSEditor from '../pages/editor/editor'
export default () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/app/index" push />} />
      <Route exact path="/index" render={() => <Redirect to="/app/index" push />} />
      <Route path="/app" component={Index} />
      <Route path="/post" component={FSEditor} />
    </Switch>
  </Router>
)