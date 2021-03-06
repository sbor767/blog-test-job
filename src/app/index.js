import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { PagesPostsList, PagesSignIn } from '../components/pages'
import { RoutesPosts } from './routes'
import * as actions from '../store/actions.js'
import "../theme/style.css"
import PropTypes from 'prop-types'


class App extends Component {

  static propTypes = {
    user: PropTypes.object,
    posts: PropTypes.object,
    comments: PropTypes.object,
    dispatch: PropTypes.func
  }

  static defaultProps = {
    user: {},
    posts: {},
    comments: {}
  }


  componentDidMount() {
    const { dispatch, posts, comments } = this.props
    actions.user.init()(dispatch)
    actions.users.init()(dispatch)
    actions.posts.fetchIfNeeded(posts)(dispatch)
    actions.comments.fetchIfNeeded(comments)(dispatch)
  }

  onLogin = user => {
    actions.user.signIn(user)(this.props.dispatch)
  }

  render() {

    const { user } = this.props

    return (
      <Switch>

        <Route exact path="/" component={PagesPostsList} />

        <Route path="/posts" component={RoutesPosts} />

        <Route
          path="/sign-in"
          render={({ history }) => (
            !!user.id ? (
              <Redirect to="/" />
            ) : (
              <PagesSignIn history={history} onLogin={this.onLogin} />
            )
          )}
        />

      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  posts: state.posts,
  comments: state.comments
})

export default withRouter(connect(mapStateToProps)(App))