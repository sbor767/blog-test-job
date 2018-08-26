import React, { Component } from 'react'
import ReactDom from 'react-dom'

import Header from '../../components/header'
import Loading from '../../components/loading'
import InputBoxContainer from '../../components/InputBoxContainer'
import {Link} from 'react-router-dom'
import ListPost from './list-post'
import ButtonTo from '../../components/button-to'
import SignInOut from '../../components/sign-in-out'

export default class PostListPage extends Component {

  componentDidMount() {
    // this.scrollToBottom()
  }

  componentDidUpdate(previousProps) {
    if (previousProps.blogPosts.length !== this.props.blogPosts.length) this.scrollToBottom()
  }

  scrollToBottom = () => {
    const headerContainer = ReactDom.findDOMNode(this.headerContainer)
    if (headerContainer) headerContainer.scrollTop = headerContainer.scrollHeight
  }

  getAuthor = (userId) => this.props.users.filter(user => user.id === userId).pop().name
  getCommentCount = (postId) => this.props.comments.filter(comment => comment.post === postId).length
  getCommentLastTime = (postId) => this.props.comments.filter(comment => comment.post === postId).reduce((acc, curr) => acc > curr.timestamp ? acc : curr.timestamp, '')

  render() {
    const {
      user,
      blogPostsLoaded,
      blogPosts,
      onSubmit,
      onSignOut
    } = this.props

    return (
    <div id="ForumContainer" className="inner-container">
      <Header title="The BLOG">
        <SignInOut user={user} onSignOut={onSignOut}>
          <ButtonTo title={'Create POST'} to={'/create'} classes={['blue', 'ButtonTo_float_right']}/>
        </SignInOut>
      </Header>

      {blogPostsLoaded ? (
        <div
          id="message-container"
          ref={element => {
          this.headerContainer = element}}
        >
          {blogPosts.map(current => (
            <ListPost
              key={`post_id-${current.id}`}
              postId={current.id}
              title={current.title}
              author={this.getAuthor(current.author)}
              timstamp={current.timestamp}
              body={current.body}
              comments={this.getCommentCount(current.id)}
              lastComment={this.getCommentLastTime(current.id)}
            />
          ))}
        </div>

      ) : (
        <Loading />
      )}

      <InputBoxContainer
        onSubmit={onSubmit}
        blogPosts={blogPosts}
      />

    </div>
  )}
}