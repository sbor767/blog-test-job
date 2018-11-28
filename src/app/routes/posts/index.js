import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { PagesPost, PagesPostCreate } from '../../../components/pages'


function RoutesPosts({ user }) {

  return (
    <Switch>
      <Route
        path="/posts/create"
        render={({ history }) => (
          user.id ? (
            <PagesPostCreate history={history} />
          ) : (
            <Redirect to="/" />
          ))}
      />
      <Route
        path="/posts/:id"
        render={({ history, match }) => <PagesPost postId={+match.params.id} history={history} />}
      />
    </Switch>
  )
}


export default connect(state => ({
  user: state.user
}))(RoutesPosts)