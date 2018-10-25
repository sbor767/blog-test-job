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
    return (
      <LayoutRoot>
        <Route
          exact path="/"
          render={() => {
            return (
              //
//              <PostListPage
//                user={this.state.user}
//                isLoaded={this.state.isLoaded}
//                users={this.state.users}
//                comments={this.state.comments}
//                posts={this.state.posts}
//                onSignOut={this.handleSignOut}
//              />
              //
              // console.log('AAA')
              // connect(state => ({
              //     user: state.user,
              //     // isLoaded: state.isLoaded,
              //     users: state.users,
              //     comments: state.comments,
              //     // posts: state.posts
              //     posts: this.props.posts,
              //     allState: state
              //   })
              //
              // )(PostListPage)
              // connect(
                // () => ({
                  // user: 1,
                  // users: [],
                  // comments: [],
                  // posts: this.props.posts,
                // })

              // )(PostListPage)
              // cont()
              <PostListPage />
            )
          }}
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
  posts: state.posts,
  comments: state.comments
})

export default connect(mapStateToProps)(App)
// export default App