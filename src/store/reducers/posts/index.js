import * as actions from '../../actions'
import * as utils from '../../utils'

export default function posts(state = {}, action) {
  let newState
  switch (action.type) {
    case actions.ADD_POST:
      newState = {...state}
      let newPost = {}
      newPost.id = utils.getNewObjectIdKey(state.posts)
      newPost.title = action.title
      newPost.body = action.body
      newPost.userId = state.user.id
      newPost.timestamp = Date.now()
      newState.posts[newPost.id] = newPost
      return newState

    case actions.DELETE_POST:
      newState = {...state}
      newState.posts = Object.keys(state.posts).reduce((object, key) => {
        if (key !== action.postId) {
          object[key] = state.posts[key]
        }
        return object
      }, {})
      return newState

    case actions.COMMENT_POST:
      newState = {...state}
      // @TODO May be move this to comment responsibility??
      let newComment = {}
      newComment.id = utils.getNewObjectIdKey(state.comments)
      newComment.postId = action.postId
      newComment.body = action.commentBody
      newComment.userId = state.user.id
      newComment.timestamp = Date.now()
      newState.comments[newComment.id] = newComment
      newState.posts[action.postId].comments.push(newComment.id)
      return newState

    default: return state
  }
}