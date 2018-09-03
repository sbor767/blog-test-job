import React, { Component } from 'react'
import Post from './post'
import Loading from '../../components/loading'
import Header from '../../components/header'
import ButtonTo from '../../components/button-to'
import SignInOut from '../../components/sign-in-out'
import CommentList from './comment-list'
import CommentAdd from './comment-add'
import {posts, comments, users} from '../../api/rest-like'
import LayoutPage from '../../components/layouts/layout-page'
import LayoutContentItems from '../../components/layouts/layout-content-items'


function getData(postId) {
  return Promise.all([
    posts.get(postId),
    comments.get(),
    users.get()
  ])
}

export default class PostPage extends Component {
  state = {post: {}, comments: [], users: [], isLoaded: false, error: ''}

  componentDidMount() {
    getData(this.props.postId)
      .then(values => {
        console.log('PostPage-componentDidMount=postId, values=', this.props.postId, values)
        let postComments = values[1].filter(comment => comment.post === +this.props.postId)
        this.setState({
          post: values[0],
          comments: postComments,
          users: values[2],
          isLoaded: true,
          error: ''
        })
      })
      .catch(error => {
        console.log('Api get post test data error: ', error)
        this.setState({
          post: {},
          comments: [],
          users: [],
          isLoaded: false,
          error
        })
      })
  }

  getAuthor = (userId) => {
    console.log('getAuthor ==', this.state.users, userId)
    if (!userId || !this.state.users) return ''
    let user = this.state.users.filter(user => user.id === +userId).pop()
    if (!user) return ''
    return user.name
  }

  onCommentSubmitHandler = (comment) => {
    let comments = [...this.state.comments]
    comments.push(comment)
    this.setState({ comments })
  }

  render() {
    const {
      postId,
      user,
      onSignOut,
      history
    } = this.props

    console.log('PostPage-render', this.props)

    return (
      <LayoutPage>
        <Header title={this.state.post.title}>
          <SignInOut user={user} onSignOut={onSignOut}>
            <ButtonTo title="Back to Home" to={"/"} classes={['blue']}/>
          </SignInOut>
        </Header>

        {this.state.isLoaded ? (
          <LayoutContentItems>
            <div className="PostPage__post">
              <Post
                postId={this.state.post.id}
                title={this.state.post.title}
                body={this.state.post.body}
                author={this.getAuthor(this.state.post.author)}
                timestamp={this.state.post.timestamp}
              />
            </div>
            <hr className="PostPage__hr"/>
            <div className="PostPage__comments">
              <CommentList
                history={history}
                postId={postId}
                postComments={this.state.comments}
                getAuthor={this.getAuthor}
              />
            </div>
            {!!user ?
              <div className="CommentList__add">
                <CommentAdd
                  history={history}
                  postId={postId}
                  currentUserId={user.id}
                  onSubmit={this.onCommentSubmitHandler}
                />
              </div>
            : ''}
          </LayoutContentItems>
          ) : (
            <Loading/>
          )
        }
      </LayoutPage>
    )
  }
}