import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDom from 'react-dom'

import Header from '../../components/header'
import Loading from '../../components/loading'
import ListPost from './list-post'
import ButtonTo from '../../components/button-to'
import SignInOut from '../../components/sign-in-out'
import LayoutPage from '../../components/layouts/layout-page'
import LayoutContentItems from '../../components/layouts/layout-content-items'

// export default class PostListPage extends Component {
class PostListPage extends Component {

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
      users,
      posts,
      comments,
      isLoaded,
      // onSubmit,
      // onSignOut
    } = this.props
    console.log('DEBUG-post-list-page=props', this.props)
    return (
    <LayoutPage>

      <Header title="The BLOG">
        {/*<SignInOut user={user} onSignOut={onSignOut}>*/}
        <SignInOut user={user} onSignOut={() => {}}>
          <ButtonTo title={'Create POST'} to={'/post-create'} classes={['blue', 'ButtonTo_float_right']}/>
        </SignInOut>
      </Header>

      {isLoaded ? (
        <LayoutContentItems
          // ref={element => {this.headerContainer = element}}
        >
          {Object.keys(posts.items).map(key => {
            return (
            <ListPost
              key={`post_id-${key}`}
              postId={posts.items[key].id}
              title={posts.items[key].title}
              author={users.items[posts.items[key].authorId].name}
              timstamp={posts.items[key].timestamp}
              body={posts.items[key].body}
              // commentsCount={this.getCommentsCount(posts.items[key].id)}
              commentsCount={1}
              // lastComment={this.getCommentLastTime(posts.items[key].id)}
              lastComment={'24424-33'}
            />
          )})}
        </LayoutContentItems>

      ) : (
        <Loading />
      )}

    </LayoutPage>
  )}
}

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
  posts: state.posts,
  isLoaded: !state.posts.isFetching && !state.posts.didInvalidate,
  comments: {},
})

export default connect(mapStateToProps)(PostListPage)