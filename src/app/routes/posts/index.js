import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { PagesPost, PagesPostCreate } from '../../../components/pages'
import PropTypes from 'prop-types'


class RoutesPosts extends Component {

  static propTypes = {
    isLoaded: PropTypes.bool,
    user: PropTypes.object,
  }

  static defaultProps = {
    isLoaded: false
  }


  render() {
    const { isLoaded, user } = this.props

    return (
      <Switch>

        <Route
          path="/posts/create"
          render={({ history }) => {
            if (!isLoaded || user.id) {
              return <PagesPostCreate history={history} />
            } else {
              return <Redirect to="/" />
            }
          }}
        />

        <Route
          path="/posts/:id"
          render={({history, match}) => <PagesPost postId={+match.params.id} history={history} />}
        />

      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isLoaded: !state.posts.isFetching
    && !state.posts.didInvalidate
    && !state.comments.isFetching
    && !state.comments.didInvalidate
    && !!state.users
    && !!state.user
})


export default connect(mapStateToProps)(RoutesPosts)