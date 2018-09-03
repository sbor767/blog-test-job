import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import LayoutRoot from '../../components/layouts/layout-root'
import PostListPage from '../post-list-page'
import PostPage from '../post-page'
import SignInPage from '../sign-in-page'
import PostCreatePage from '../post-create-page'
import {user, users, posts, comments} from '../../api/rest-like'
import '../../components/app.css'

function getData() {
  return Promise.all([
      user.get(),
      users.get(),
      posts.get(),
      comments.get()
  ])
}

export default class App extends Component {
	state = {
    user: {},
    users: [],
    posts: [],
    isLoaded: false,
    comments: [],
    error: ''
  }

  componentDidMount() {
	  getData()
      .then(values => this.setState({
        user: values[0],
        users:values[1],
        posts: values[2],
        comments: values[3],
        isLoaded: true,
        error: ''
      }))
      .catch(error => {
        console.log('Api get test data error: ', error)
        this.setState({
          user: {},
          users: [],
          posts: [],
          comments: [],
          isLoaded: false,
          error
        })
      })
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
            <PostListPage
              user={this.state.user}
              isLoaded={this.state.isLoaded}
              users={this.state.users}
              comments={this.state.comments}
              posts={this.state.posts}
              onSignOut={this.handleSignOut}
            />
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