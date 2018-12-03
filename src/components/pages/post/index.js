import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { types as commentsActionTypes } from '../../../store/comments/actions.js'
import { types as postsActionTypes } from '../../../store/posts/actions.js'
import { getNewObjectIdKey, getTimestamp } from '../../../utils'
import { LayoutPage, LayoutContentItems } from '../../ui/layouts'
import { Header, Loading } from '../..'

import PagesPostContent from './content'
import PagesPostCommentList from './comment-list'
import PagesPostCommentAddForm from './comment-add-form'
import './style.css'


class PagesPost extends Component {

  static propTypes = {
    postId: PropTypes.number.isRequired,
    isLoaded: PropTypes.bool,
    user: PropTypes.object,
    users: PropTypes.object,
    posts: PropTypes.object,
    comments: PropTypes.object,
    dispatch: PropTypes.func
  }

  static defaultProps = {
    isLoaded: false
  }


  onCommentSubmitHandler = commentBody => {
    const {postId, user, comments, dispatch} = this.props
    const newComment = {
      id: getNewObjectIdKey(comments.items),
      postId,
      authorId: user.id,
      body: commentBody,
      rates: {},
      timestamp: getTimestamp()
    }
    dispatch({type: commentsActionTypes.ADD, newComment})
    dispatch({type: postsActionTypes.COMMENT, postId, commentId: newComment.id})
  }


  render() {
    const {
      postId,
      isLoaded,
      user,
      users,
      posts,
    } = this.props

    const header = (
      <Header
        title={isLoaded && !!posts.items[postId] ? posts.items[postId].title : 'Loading...'}
        className='PagesPost__header'
      />
    )

    const commentAddForm = () => (
      !!user.id ? (
        <PagesPostCommentAddForm
          postId={postId}
          onSubmit={this.onCommentSubmitHandler}
        />
      ) : null
    )


    return (

      <LayoutPage header={header} className="PagesPost">

        {/*@TODO Refactor this to using 404 instead*/}
        {isLoaded && !!posts.items[postId] ? (
          <Fragment>

            <PagesPostContent
              body={posts.items[postId].body}
              author={users.items[posts.items[postId].authorId].name}
              timestamp={posts.items[postId].timestamp}
            />

            <hr className="PagesPost__hr" />

            <div className="PagesPost__CommentListTitle">
              <span>Comments</span>
            </div>

            <LayoutContentItems>
              <PagesPostCommentList commentsIds={posts.items[postId].comments} />
            </LayoutContentItems>
            {commentAddForm()}

          </Fragment>

        ) : (!!posts.items[postId] ? <Loading /> : <div className="PagesPost__errorNoSuchPost">No such post exist.</div>
        )}

      </LayoutPage>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
  posts: state.posts,
  isLoaded: !state.posts.isFetching && !state.posts.didInvalidate && !state.comments.isFetching && !state.comments.didInvalidate,
  // Only for comments.newId()
  // @TODO Delete this after new API
  comments: state.comments
})

export default connect(mapStateToProps)(PagesPost)