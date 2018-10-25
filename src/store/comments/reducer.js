import reducer from '../../utils/reducer'
import {types} from './actions.js'

const initState = {
  didInvalidate: true,
  isFetching: false,
  items: {},
  lastUpdated: null,
  errors: null,
}


export default reducer(initState, {

  [types.INVALIDATE]: state => {
    return {
      ...state,
      didInvalidate: true
    }
  },

  [types.REQUEST]: state => {
    return {
      ...state,
      isFetching: true,
      errors: null
    }
  },

  [types.RECEIVE]: (state, action) => {
    return {
      ...state,
      items: action.comments,
      didInvalidate: false,
      isFetching: false,
      lastUpdated: action.receivedAt,
      errors: null
    }
  },

  [types.RECEIVE_FAILURE]: (state, action) => {
    return {
      ...state,
      errors: action.message
    }
  },

  [types.ADD]: (state, action) => {
    const items = [...state.items]
    items[action.newComment.id] = action.newComment
    return {
      ...state,
      items
    }
  },

  [types.DELETE]: (state, action) => {
    const items = [...state.items]
    delete(items[action.postId])
    return {
      ...state,
      items
    }
  },

  [types.COMMENT]: (state, action) => {
    const items = [...state.items]
    items[action.postId].comments.push(action.commentId)
    return {
      ...state,
      items
    }
  },

})
