import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import LayoutRoot from '../../components/layouts/layout-root'
import PostListPage from '../post-list-page'
import PostPage from '../post-page'
import SignInPage from '../sign-in-page'
import PostCreatePage from '../post-create-page'
import * as actions from '../../store/actions.js'
import '../../components/app.css'

class App extends Component {

  componentDidMount() {
    const { dispatch, posts, comments } = this.props
    actions.user.init()(dispatch)
    actions.users.init()(dispatch)
    actions.posts.fetchIfNeeded(posts)(dispatch)
    actions.comments.fetchIfNeeded(comments)(dispatch)
  }

  handlePostCreate = post => {
    // @TODO this redundantly because state will updated with route change.
    // So leave mutation in RestApi only.
/*
    let blogPosts = [...this.state.posts]
    posts.push(post)
    this.setState({ posts })
*/
  }

  render() {
    return (
      <LayoutRoot>
        <Route
          exact path="/"
          render={() => {
            return (
              <PostListPage />
            )
          }}
        />
        <Route
          path="/posts/:id"
          render={({ history, match }) => (
            <PostPage
              postId={match.params.id}
              user={this.props.user}
              history={history}
            />
          )}
        />
        <Route
          path="/sign-in"
          render={({ history, match }) => (
            <SignInPage
              history={history}
            />
          )}
        />
        <Route
          path="/post-create"
          render={({ history, match }) => (
            <PostCreatePage
              currentUserId={this.props.user.id}
              onSubmit={this.handlePostCreate}
              history={history}
            />
          )}
        />
      </LayoutRoot>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  posts: state.posts,
  comments: state.comments
})

export default connect(mapStateToProps)(App)