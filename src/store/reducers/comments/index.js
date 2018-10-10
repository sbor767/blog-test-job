import * as actions from '../../actions'
import * as rate from '../../rate'
import * as utils from '../../utils'

export default function comments(state = {}, action) {
  let newState
  switch (action.type) {
    case actions.RATE_COMMENT:
      // @TODO May be move this to rate responsibility??
      let newRate = {}

      // Check for rate existence
      if (rate.isExist(state, action.commentId, state.user.id)) return state

      newRate.id = utils.getNewObjectIdKey(state.rates)
      newRate.commentId = action.commentId
      newRate.rate = action.rate
      newRate.userId = state.user.id
      newRate.timestamp = Date.now()
      newState = {...state}
      newState.rates[newRate.id] = newRate
      newState.posts[action.postId].comments.push(newRate.id)
      return newState

    default: return state
  }
}