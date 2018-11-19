import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'

import LayoutPage from '../../components/layouts/layout-page'
import LayoutContentItems from '../../components/layouts/layout-content-items'
import LayoutHeader from '../../components/layouts/layout-header'
import Logo from '../../components/elements/logo'
import SignInOut from '../../components/sign-in-out'
import Loading from '../../components/loading'
import ButtonLink from '../../components/button-link'
import ListPost from './list-post'
import './style.css'

class PostListPage extends Component {

  static propTypes = {
    user: PropTypes.object,
    users: PropTypes.object,
    posts: PropTypes.object,
    comments: PropTypes.object,
    isLoaded: PropTypes.bool,
    dispatch: PropTypes.func
  }

  componentDidMount() {
    // this.scrollToBottom()
  }

  componentDidUpdate(previousProps) {
    // if (previousProps.posts.length !== this.props.posts.length) this.scrollToBottom()
  }

  // @TODO Fix next.
  scrollToBottom = () => {
/*
    const headerContainer = ReactDom.findDOMNode(this.headerContainer)
    if (headerContainer) headerContainer.scrollTop = headerContainer.scrollHeight
*/
  }

  render() {
    const {
      user,
      users,
      posts,
      comments,
      isLoaded,
    } = this.props

    const lastComment = key => {
      let postComments = posts.items[key].comments
      if (!postComments.length) return 'None'
      return postComments.reduce((acc, curr) => acc > comments.items[curr].timestamp ? acc : comments.items[curr].timestamp, postComments[0].timestamp)
    }

    const header = (
      <LayoutHeader
        className='PostListPage__header'
        left={<Logo/>}
        center={(<h1>The BLOG</h1>)}
        right={<SignInOut/>}
      />
    )

    const contentFooter = (
      <LayoutHeader
        className='PostListPage__contentFooter'
        right={<ButtonLink to={'/post-create'} className='PostListPage__contentFooterButtonTo'>Create POST</ButtonLink>}
      />
    )


    return (
    <LayoutPage header={header} className='PostListPage'>

      {isLoaded ? (
        <Fragment>
          <LayoutContentItems
            className={cn('PostListPage__contentItems', {"PostListPage__contentItems_whenCreateButton": !!user.id})}
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
                lastComment={lastComment(postId)}
              />
            )})}
          </LayoutContentItems>
          {!!user.id ? (
            contentFooter
          ) : ''}
        </Fragment>
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
  comments: state.comments,
  isLoaded: !state.posts.isFetching && !state.posts.didInvalidate && !state.comments.isFetching && !state.comments.didInvalidate,
})

export default connect(mapStateToProps)(PostListPage)