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
    // if (previousProps.posts.length !== this.props.posts.length) this.scrollToBottom()
  }

  // @TODO Fix next.
  scrollToBottom = () => {
    const headerContainer = ReactDom.findDOMNode(this.headerContainer)
    if (headerContainer) headerContainer.scrollTop = headerContainer.scrollHeight
  }

  render() {
    const {
      users,
      posts,
      comments,
      isLoaded,
    } = this.props

    // console.log('PostListPage')

    const lastComment = key => {
      let postComments = posts.items[key].comments
      if (!postComments.length) return 'None'
      return postComments.reduce((acc, curr) => acc > comments.items[curr].timestamp ? acc : comments.items[curr].timestamp, postComments[0].timestamp)
    }

    return (
    <LayoutPage>

      <Header title="The BLOG">
        <SignInOut>
          <ButtonTo title={'Create POST'} to={'/post-create'} classes={['blue', 'ButtonTo_float_right']}/>
        </SignInOut>
      </Header>

      {isLoaded ? (
        <LayoutContentItems
          // ref={element => {this.headerContainer = element}}
        >
          {Object.keys(posts.items).map(postId => {
            return (
            <ListPost
              key={`post_id-${postId}`}
              postId={posts.items[postId].id}
              title={posts.items[postId].title}
              author={users.items[posts.items[postId].authorId].name}
              timestamp={posts.items[postId].timestamp}
              body={posts.items[postId].body}
              commentsCount={posts.items[postId].comments.length}
              // lastComment={lastComment(key)}
              lastComment={1540717332}
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
  users: state.users,
  posts: state.posts,
  comments: state.comments,
  isLoaded: !state.posts.isFetching && !state.posts.didInvalidate && !state.comments.isFetching && !state.comments.didInvalidate,
})

export default connect(mapStateToProps)(PostListPage)