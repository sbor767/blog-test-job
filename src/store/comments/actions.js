import * as api from '../../api'

export const types = {
  INVALIDATE: Symbol('INVALIDATE COMMENTS'),
  REQUEST: Symbol('REQUEST COMMENTS'),
  RECEIVE: Symbol('RECEIVE COMMENTS'),
  RECEIVE_FAILURE: Symbol('RECEIVE FAILURE COMMENTS'),

  ADD: Symbol('ADD COMMENT'),
  RATE: Symbol('RATE COMMENT'),
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

  add: (postId, commentBody, userId) => async dispatch => {
    try {
      const newComment = await api.comments.add(commentBody, postId, userId)
      dispatch({type: types.ADD, newComment})
    } catch (e) {
      throw e
    }
  },

  add2: (state, postId, body) => dispatch => {
    api.comments.add(body, postId, state.user.id)
    // @TODO May be better dispatch action INVALIDATE_POSTS only?
    // .then(response => {dispatch(INVALIDATE_POSTS)})
    // Here partial approach - we meaningly lost returned value from add promise and use our store.
      .then(newComment => {
        dispatch(state, {type: types.ADD, postId, newComment})
        // dispatch(state, {type: postsTypes.COMMENT, postId, newComment})
        // dispatch(state, {type: postActions.types.COMMENT, postId, newComment})
      })
      .catch(reason => console.log('Failed addPost with reason: ', reason))
  },

  rate: (postId, commentBody) => async (dispatch, getState) => {
    try {
      const newComment = await api.comments.add(commentBody, postId, getState().user.id)
      // @TODO Add new action for comments aka 'types.comments.NEW' and await its add.
      if (newComment) dispatch({type: types.COMMENT, postId, commentId: newComment.id })
    } catch (e) {
      console.log('Posts add comment error:', e)
      throw e
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