import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'

import LayoutPage from '../../components/layouts/layout-page'
import LayoutContentItems from '../../components/layouts/layout-content-items'
import Post from './post'
import Header from '../../components/header'
import CommentList from './comment-list'
import CommentAdd from './comment-add'
import Loading from '../../components/loading'
import { getNewObjectIdKey, getTimestamp } from '../../utils'
import { types as commentsActionTypes } from '../../store/comments/actions.js'
import { types as postsActionTypes } from '../../store/posts/actions.js'
import './style.css'

class PostPage extends Component {

  static propTypes = {
    postId: PropTypes.number.isRequired,
    isLoaded: PropTypes.bool,
    user: PropTypes.object,
    users: PropTypes.object,
    posts: PropTypes.object,
    comments: PropTypes.object,
    history: PropTypes.object,
    dispatch: PropTypes.func
  }


  // onCommentSubmitHandler = async commentBody => {
  onCommentSubmitHandler = commentBody => {
    const {postId, user, comments, dispatch} = this.props
    // commentsActions.add(postId, commentBody, user.id)(dispatch)
    // await postActions.comment(postId, user.id, commentBody)(dispatch)
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

  commentAdd = () => {
    const { postId, user, history } = this.props

    return !!user.id ?
      <div className="CommentList__add">
        <CommentAdd
          history={history}
          postId={postId}
          onSubmit={this.onCommentSubmitHandler}
        />
      </div>
      : ''
  }

  render() {
    const {
      postId,
      isLoaded,
      users,
      posts,
    } = this.props

    const header = (
      <Header
        title={isLoaded ? posts.items[postId].title :'Loading...'}
        className='PostPage__header'
      />
    )


    return (
      <LayoutPage header={header} className='PostPage'>

        {isLoaded ? (
          <LayoutContentItems>
            <Post
              body={posts.items[postId].body}
              author={users.items[posts.items[postId].authorId].name}
              timestamp={posts.items[postId].timestamp}
            />
            <hr className="PostPage__hr"/>
            <div className="PostPage__comments">
              <CommentList
                commentsIds={posts.items[postId].comments}
              />
            </div>
            {this.commentAdd()}
          </LayoutContentItems>
          ) : (
            <Loading/>
          )
        }
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

export default connect(mapStateToProps)(PostPage)