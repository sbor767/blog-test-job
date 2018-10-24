import * as api from '../../api/index'

// Comments
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const INVALIDATE_COMMENTS = 'INVALIDATE_COMMENTS'

export const RATE_COMMENT = 'RATE_COMMENT'

/*
 * Action creators
 */
/*
export function invalidatePosts() {
  return {type: INVALIDATE_POSTS}
}

function requestPosts() {
  return {type: REQUEST_POSTS}
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

const fetchPosts = () => dispatch => {
  dispatch(requestPosts())
  return api.posts.get()
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
}

function shouldFetchPosts(state) {
  const posts = state.posts.items
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if(shouldFetchPosts(getState())) dispatch(fetchPosts())
  }
}

/!*
export function addPost(title, body) {
  return {type: ADD_POST, title, body}
}
*!/

export function addPost(state, title, body) {
  // return {type: ADD_POST, title, body}
  return (dispatch, getState) => {
    api.posts.add({title, body}, state.author.id)
      // @TODO May be better dispatch action INVALIDATE_POSTS only?
      // .then(response => {dispatch(INVALIDATE_POSTS)})
      // Here partial approach - we meaningly lost returned value from add promise and use our store.
      .then(newPost => {
        console.log('newPost=', newPost)
        dispatch(state, {type: ADD_POST, title, body})
      })
      .catch(reason => console.log('Failed addPost with reason: ', reason))
  }
}


export function deletePost(postId) {
  return {type: DELETE_POST, postId}
}

export function commentPost(postId, commentBody) {
  return {type: COMMENT_POST, postId, commentBody}
}
*/

export function rateComment(commentId, rate) {
  return {type: RATE_COMMENT, commentId, rate}
}