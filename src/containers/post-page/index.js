import React, { Component } from 'react'
import Post from './post'
import Loading from '../../components/loading'
import Header from '../../components/header'
import ButtonTo from '../../components/button-to'
import SignInOut from '../../components/sign-in-out'
import comments from '../../api/rest-like/comments'
import CommentList from './comment-list'
import CommentAdd from './comment-add'

export default class PostPage extends Component {
  state = {comments: [], commentsLoaded: false, error: ''}

  componentDidMount() {
    // comments.get()
    comments.get()
      .then(comments => {
        comments = comments.filter(comment => comment.post === +this.props.postId)
        this.setState({ comments, commentsLoaded: true, error: '' })
      })
  }

  getAuthor = (userId) => {
    return this.props.users.filter(user => user.id === +userId).pop().name
  }
  getCommentCount = (postId) => this.props.comments.filter(comment => comment.post === +postId).length
  getCommentLastTime = (postId) => this.props.comments.filter(comment => comment.post === +postId).reduce((acc, curr) => acc > curr.timestamp ? acc : curr.timestamp, '')

  onCommentSubmitHandler = (comment) => {
    let comments = [...this.state.comments]
    comments.push(comment)
    this.setState({ comments })
  }

  render() {
    const {
      user,
      postId,
      blogPostsLoaded,
      blogPosts,
      onSignOut,
      history
    } = this.props

    let post = blogPosts.filter(item => item.id === +postId).pop()
    let author = this.getAuthor(post.author)

    console.log('PostPage--postId:', this.props.postId)
    console.log('PostPage--state:', this.state)

    return (
      <div className="PostPage">
        <Header title={post.title}>
          <SignInOut user={user} onSignOut={onSignOut}>
            <ButtonTo title="Back to Home" to={"/"} classes={['blue']}/>
          </SignInOut>
        </Header>

        {blogPostsLoaded && this.state.commentsLoaded ? (
          <div className="PostPage__all">
            <div className="PostPage__post">
              <Post
                postId={post.id}
                title={post.title}
                body={post.body}
                author={author}
                timestamp={post.timestamp}
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
          </div>
          ) : (
            <Loading/>
          )
        }
      </div>
    )
  }
}