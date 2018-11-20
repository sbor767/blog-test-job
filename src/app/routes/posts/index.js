import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { PagesPost, PagesPostCreate } from '../../../components/pages'


export default function RoutesPosts() {

  return (
    <Switch>
      <Route
        path="/posts/:id"
        render={({ history, match }) => <PagesPost postId={+match.params.id} history={history} />}
      />
      <Route
        path="/posts/create"
        render={({ history }) => <PagesPostCreate history={history} />}
      />
    </Switch>
  )
}