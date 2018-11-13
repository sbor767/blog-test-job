import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'

import Post from './post'
import Loading from '../../components/loading'
import Header from '../../components/header'
import ButtonTo from '../../components/button-to'
import SignInOut from '../../components/sign-in-out'
import CommentList from './comment-list'
import CommentAdd from './comment-add'
import LayoutPage from '../../components/layouts/layout-page'
import LayoutContentItems from '../../components/layouts/layout-content-items'
import { getNewObjectIdKey, getTimestamp } from '../../utils'
import { types as commentsActionTypes } from '../../store/comments/actions.js'
import { types as postsActionTypes } from '../../store/posts/actions.js'


class PostPage extends Component {

  // onCommentSubmitHandler = async commentBody => {
  onCommentSubmitHandler = commentBody => {
    const {postId, user, posts, comments, dispatch} = this.props
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

  render() {
    const {
      postId,
      user,
      isLoaded,
      users,
      posts,
      history
    } = this.props

    return (
      <LayoutPage>
        <Header title={isLoaded ? posts.items[postId].title : 'Loading...'}>
          <ButtonTo title="Back to Home" to={"/"} classes={['blue']}/>
          <SignInOut>
          </SignInOut>
        </Header>


        {isLoaded ? (
          <LayoutContentItems>
            <div className="PostPage__post">
              <Post
                body={posts.items[postId].body}
                author={users.items[posts.items[postId].authorId].name}
                timestamp={posts.items[postId].timestamp}
              />
            </div>
            <hr className="PostPage__hr"/>
            <div className="PostPage__comments">
              <CommentList
                commentsIds={posts.items[postId].comments}
              />
            </div>
            {/* @TODO Change to func isLogged? */}
            {!!user.id ?
              <div className="CommentList__add">
                <CommentAdd
                  history={history}
                  postId={postId}
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