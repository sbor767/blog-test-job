import { combineReducers } from 'redux'

// import init from './init'
import posts from './posts'
import comments from './comments'

export default combineReducers({
  // init,
  posts,
  comments
})