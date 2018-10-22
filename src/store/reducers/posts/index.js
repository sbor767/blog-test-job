import * as actions from '../../actions'
import * as utils from '../../utils'

export default function posts(state = {}, action) {
  let newState = {...state}

  switch (action.type) {

    case actions.posts.REQUEST_POSTS:
      newState.isFetching = true
      break

    case actions.posts.RECEIVE_POSTS:
      newState.items = action.posts
      newState.isFetching = false
      newState.didInvalidate = false
      newState.lastUpdated = action.receivedAt
      break

    case actions.posts.INVALIDATE_POSTS:
      newState.didInvalidate = true
      break

    case actions.posts.ADD_POST:
      let newPost = {}
      newPost.id = utils.getNewObjectIdKey(state.posts)
      newPost.title = action.title
      newPost.body = action.body
      newPost.userId = state.user.id
      newPost.timestamp = Date.now()
      newState.posts.items[newPost.id] = newPost
      break

    case actions.posts.DELETE_POST:
      newState.posts.items = Object.keys(state.posts).reduce((object, key) => {
        if (key !== action.postId) {
          object[key] = state.posts[key]
        }
        return object
      }, {})
      break

    case actions.posts.COMMENT_POST:
      // @TODO May be move this to comment responsibility??
      let newComment = {}
      newComment.id = utils.getNewObjectIdKey(state.comments)
      newComment.postId = action.postId
      newComment.body = action.commentBody
      newComment.userId = state.user.id
      newComment.timestamp = Date.now()
      newState.comments[newComment.id] = newComment
      newState.posts.items[action.postId].comments.push(newComment.id)
      break

    default: return state

  }

  return newState
}