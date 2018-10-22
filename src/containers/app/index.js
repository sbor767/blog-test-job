import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import LayoutRoot from '../../components/layouts/layout-root'
import PostListPage from '../post-list-page'
import PostPage from '../post-page'
import SignInPage from '../sign-in-page'
import PostCreatePage from '../post-create-page'
import {user, users, posts, comments} from '../../api/rest-like'
import { fetchPostsIfNeeded } from '../../store/actions/posts'
import '../../components/app.css'

class App extends Component {
	state = {
    user: {},
    users: [],
    posts: [],
    isLoaded: false,
    comments: [],
    error: ''
  }

  componentDidMount() {
    const { dispatch, posts } = this.props
    fetchPostsIfNeeded(posts)
  }

  handleSignOut = () => {
    this.setState({ user: {} })
  }

  handleSignIn = loggedUser => {
    this.setState({ user: loggedUser })
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
    console.log('app--state--render0', this.state)
    return (
      <LayoutRoot>
        <Route
          exact path="/"
          render={() => (
            //
            // <PostListPage
            //   user={this.state.user}
            //   isLoaded={this.state.isLoaded}
            //   users={this.state.users}
            //   comments={this.state.comments}
            //   posts={this.state.posts}
            //   onSignOut={this.handleSignOut}
            // />
            //
            connect(state => ({
              user: state.user,
              // isLoaded: state.isLoaded,
              users: state.users,
              comments: state.comments,
              posts: state.posts
          })

            )(PostListPage)
          )}
        />
        <Route
          path="/posts/:id"
          render={({ history, match }) => (
            <PostPage
              postId={match.params.id}
              user={this.state.user}
              onSignOut={this.handleSignOut}
              history={history}
            />
          )}
        />
        <Route
          path="/sign-in"
          render={({ history, match }) => (
            <SignInPage
              onSubmit={this.handleSignIn}
              history={history}
            />
          )}
        />
        <Route
          path="/post-create"
          render={({ history, match }) => (
            <PostCreatePage
              currentUserId={this.state.user.id}
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
  posts: state.posts
})

export default connect(mapStateToProps)(App)