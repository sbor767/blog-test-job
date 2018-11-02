import * as api from '../../api'
import { posts as postsActions } from '../actions.js'
import { getNewObjectIdKey } from '../../utils'

export const types = {
  INVALIDATE: Symbol('INVALIDATE COMMENTS'),
  REQUEST: Symbol('REQUEST COMMENTS'),
  RECEIVE: Symbol('RECEIVE COMMENTS'),
  RECEIVE_FAILURE: Symbol('RECEIVE FAILURE COMMENTS'),

  ADD: Symbol('ADD COMMENT'),
  RATE: Symbol('RATE COMMENT'),
  CLEAR_RATE: Symbol('CLEAR RATE COMMENT'),
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

  add: (postId, userId, commentBody) => async dispatch => {
    try {
      // @TODO Change this (uncomment) when implemented persistent API.
      // const newComment = await api.comments.add(commentBody, postId, userId)
      const newComment = {
        id: api.comments.nextId(),
        postId,
        userId,
        body: commentBody
      }
      console.log('Actions-comment-add=newComment', newComment)
      dispatch({type: types.ADD, newComment})
      return newComment
      // postsActions.comment(postId, newComment.id)(dispatch)
    } catch (e) {
      console.log('Actions-comment-add=catch(e)', e)
      throw e
    }
  },

  rate: (commentId, userId, isUserHasRate, newRate) => dispatch => {
    if (isUserHasRate) {
      // If exist - remove user rate.
      dispatch({type: types.CLEAR_RATE, commentId, userId})
    } else {
      // Rate.
      dispatch({type: types.RATE, commentId, userId, newRate})
    }
  },

  // Private methods

  [_fetch] () {
    return async function(dispatch) {
      dispatch({type: types.REQUEST})
      try {
        const response = await api.comments.get()

        if (response) {
          dispatch({
            type: types.RECEIVE,
            comments: response,
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
    const comments = state.items
    if (!comments) {
      return true
    } else if (state.isFetching) {
      return false
    } else {
      return state.didInvalidate
    }
  }
}