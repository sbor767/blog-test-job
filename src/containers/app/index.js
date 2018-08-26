import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import PostListPage from '../post-list-page'
import PostPage from '../post-page'
import SignInPage from '../sign-in-page'
import PostCreatePage from '../post-create-page'

const RestApi = require(`../../controllers/RestApi${process.env.DEBUG_REST === 'true' ? 'Sample' : ''}`)

import '../../components/app.css'

class App extends Component {
  state = {
    user: {},
    users: [],
    blogPosts: [],
    blogPostsLoaded: false,
    comments: [],
    editItemId: undefined,
    error: undefined
  }

  constructor(props) {
    super(props);
    // this.history = createBrowserHistory();
/*
    RestApi.getTestData()
      .then(testData => {
        this.state = ({
          blogPosts: testData.blogPosts,
          users: testData.users,
          comments: testData.comments,
          blogPostsLoaded: true,
          error: undefined
        })
      })
      .catch(error => {
        console.log('RestApi.getTestData error: ', error)
        this.setState({
          blogPosts: [],
          users: [],
          comments: [],
          blogPostsLoaded: false,
          error
        })
      })
*/
    let testData = {...RestApi.testData}
    // let testData = RestApi.testData
    this.state = ({
      blogPosts: testData.blogPosts,
      users: testData.users,
      user: testData.user,
      comments: testData.comments,
      blogPostsLoaded: true,
      error: undefined
    })

  }

  componentDidMount() {
/*
    RestApi.getTestData()
      .then(testData => {
        this.setState({
          blogPosts: testData.blogPosts,
          users: testData.users,
          comments: testData.comments,
          blogPostsLoaded: true,
          error: undefined
        })
      })
      .catch(error => {
        console.log('RestApi.getTestData error: ', error)
        this.setState({
          blogPosts: [],
          users: [],
          comments: [],
          blogPostsLoaded: false,
          error
        })
      })
*/
  }

  getDerivedStateFromProps(props, state) {

  }

  handleSubmitMessage = (msg, id = undefined) => {
    if (!id) {
      // Create message.
      RestApi.create(msg)
        .then(newId => {
          // console.log('handleSubmitMessage.msg=', msg)
          // console.log('handleSubmitMessage.newId=', newId)
          // console.log('this.state.headers=', this.state.headers)
          let headers = [...this.state.headers]
          headers.push({id: newId, header: msg.header})
          // console.log('headers=', headers)
          this.setState({
            headers,
            messagesLoaded: true,
            error: undefined
          })
        })
        .catch(error => {
          console.log('RestApi.create error: ', error)
          this.setState({
            headers: [],
            messagesLoaded: false,
            error
          })
        })
    } else {
      // Edit message.
      RestApi.updateOne(msg, id)
        .then(count => {
          console.log(`Successfully updated ${count} records.`)
          let headers = [...this.state.headers]
          headers.forEach((value) => {if (value.id === id) value.header = msg.header})
          // console.log('headers=', headers)
          this.setState({
            headers,
            messagesLoaded: true,
            editItemId: undefined,
            error: undefined
          })
        })
        .catch(error => {
          console.log('RestApi.updateOne error: ', error)
          this.setState({ error })
        })
    }
  }

  handleCancelEditMessage = () => this.setState({ editItemId: undefined })

  handleDeleteMessage = id => {
    RestApi.delete(id)
      .then(() => {
        console.log(`Successfully deleted item with id=${id}.`)
        let headers = this.state.headers.filter(element => element.id !== id)
        this.setState({
          headers,
          messagesLoaded: true,
          error: undefined
        })
      })
      .catch(error => {
        console.log(`Error when deleted item with id=${id}.`)
        console.log('RestApi.delete error: ', error)
        this.setState({
          headers: [],
          messagesLoaded: false,
          error
        })
      })
  }

  handleEditMessage = id => {
    this.setState({ editItemId: id })
  }

  handleSignOut = () => {
    this.setState({ user: {} })
  }

  // handleSignIn = loginData => {
  handleSignIn = loggedUser => {
/*
    RestApi.getUserLogged(loginData)
      .then(user => this.setState({ user, error: undefined }))
      .catch(msg => {
        console.log('handleSignIn--catch-msg', msg)
        this.setState({ error: msg })
      })
*/
    this.setState({ user: loggedUser })
  }

  handlePostCreate = post => {
    // @TODO this redundantly because state will updated with route change.
    // So leave mutation in RestApi only.
/*
    let blogPosts = [...this.state.blogPosts]
    blogPosts.push(post)
    this.setState({ blogPosts })
*/
  }

  render() {
    console.log('app--state--render0', this.state)
    return (
      <div id='container'>
        <Route
          exact path="/"
          render={() => (
            <PostListPage
              user={this.state.user}
              blogPostsLoaded={this.state.blogPostsLoaded}
              users={this.state.users}
              comments={this.state.comments}
              blogPosts={this.state.blogPosts}
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
              blogPostsLoaded={this.state.blogPostsLoaded}
              blogPosts={this.state.blogPosts}
              users={this.state.users}
              comments={this.state.comments}
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
      </div>
    )
  }
}

export default withRouter(App)