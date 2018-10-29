import * as api from '../../api'
import * as comments from '../comments/actions'

export const types = {
  INVALIDATE: Symbol('INVALIDATE POSTS'),
  REQUEST: Symbol('REQUEST POSTS'),
  RECEIVE: Symbol('RECEIVE POSTS'),
  RECEIVE_FAILURE: Symbol('RECEIVE FAILURE POSTS'),

  ADD: Symbol('ADD POST'),
  DELETE: Symbol('DELETE POST'),
  COMMENT: Symbol('COMMENT POST'),
}

// Private methods
const _fetch = Symbol('fetch private method')
const _shouldFetch = Symbol('shouldFetch private method')

export default {

  // Public Methods
  invalidate: () => ({type: types.INVALIDATE}),

  fetchIfNeeded (state) {
    const that = this
    return function(dispatch) {
      if(that[_shouldFetch](state)) {
        dispatch(that[_fetch]())
      }
    }
  },

  add: (state, title, body) => dispatch => {
    api.posts.add({title, body}, state.author.id)
    // @TODO May be better dispatch action INVALIDATE_POSTS only?
    // .then(response => {dispatch(INVALIDATE_POSTS)})
    // Here partial approach - we meaningly lost returned value from add promise and use our store.
      .then(newPost => {
        console.log('newPost=', newPost)
        dispatch(state, {type: types.ADD, newPost})
      })
      .catch(reason => console.log('Failed addPost with reason: ', reason))
  },

  delete: postId => async dispatch => {
    try {
      const newPost = await api.posts.delete(postId)
      if (newPost) dispatch({type: types.DELETE, postId})
    } catch (e) {
      console.log('Posts delete error:', e)
      throw e
    }
  },

  // Enter point for the post comment
  comment: (postId, authorId, body) => async dispatch => {
    try {
      // const newComment = await api.comments.add(body, postId, authorId)
      const newComment = await comments.default.add(postId, authorId, body)(dispatch)
      console.log('action-post-comment=newComment', newComment)
      // const postComments = await api.posts.comment(postId, newComment.id)
      dispatch({type: types.COMMENT, postId, commentId: newComment.id})
    } catch (e) {
      throw e
    }

    // dispatch({type: comments.types.ADD})
    // dispatch({type: types.COMMENT, postId, commentId})
 },

  // Private methods

  [_fetch] () {
    return async function(dispatch) {
      dispatch({type: types.REQUEST})
      try {
        const response = await api.posts.get()

        if (response) {
          dispatch({
            type: types.RECEIVE,
            posts: response,
            receivedAt: Date.now()
          })
        }
      } catch (e) {
        // @TODO Check next
        if (e.response && e.response.data && e.response.data.error) {
          dispatch({type: types.RECEIVE_FAILURE, errors: e.response.data.error.data.issues})
        } else {
          throw e
        }
      }
    }
  },

  [_shouldFetch]: state => {
    const posts = state.items
    if (!posts) {
      return true
    } else if (state.isFetching) {
      return false
    } else {
      return state.didInvalidate
    }
  }
}