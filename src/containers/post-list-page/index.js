import React, { Component } from 'react'
import ReactDom from 'react-dom'

import Header from '../../components/header'
import Loading from '../../components/loading'
import ListPost from './list-post'
import ButtonTo from '../../components/button-to'
import SignInOut from '../../components/sign-in-out'
import LayoutPage from '../../components/layouts/layout-page'
import LayoutContentItems from '../../components/layouts/layout-content-items'

export default class PostListPage extends Component {

  componentDidMount() {
    // this.scrollToBottom()
  }

  componentDidUpdate(previousProps) {
    if (previousProps.posts.length !== this.props.posts.length) this.scrollToBottom()
  }

  // @TODO Fix next.
  scrollToBottom = () => {
    const headerContainer = ReactDom.findDOMNode(this.headerContainer)
    if (headerContainer) headerContainer.scrollTop = headerContainer.scrollHeight
  }

  getAuthor = (authorId) => this.props.users.filter(user => user.id === +authorId).pop().name
  getCommentsCount = (postId) => this.props.comments.filter(comment => comment.post === +postId).length
  getCommentLastTime = (postId) => this.props.comments.filter(comment => comment.post === +postId).reduce((acc, curr) => acc > curr.timestamp ? acc : curr.timestamp, '')

  render() {
    const {
      user,
      isLoaded,
      posts,
      onSubmit,
      onSignOut
    } = this.props

    return (
    <LayoutPage>

      <Header title="The BLOG">
        <SignInOut user={user} onSignOut={onSignOut}>
          <ButtonTo title={'Create POST'} to={'/post-create'} classes={['blue', 'ButtonTo_float_right']}/>
        </SignInOut>
      </Header>

      {isLoaded ? (
        <LayoutContentItems
          // ref={element => {this.headerContainer = element}}
        >
          {posts.map(current => (
            <ListPost
              key={`post_id-${current.id}`}
              postId={current.id}
              title={current.title}
              author={this.getAuthor(current.author)}
              timstamp={current.timestamp}
              body={current.body}
              commentsCount={this.getCommentsCount(current.id)}
              lastComment={this.getCommentLastTime(current.id)}
            />
          ))}
        </LayoutContentItems>

      ) : (
        <Loading />
      )}

    </LayoutPage>
  )}
}