// Posts
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const COMMENT_POST = 'COMMENT_POST'
// Comments
export const RATE_COMMENT = 'RATE_COMMENT'

/*
 * Action creators
 */
export function addPost(title, body) {
  return {type: ADD_POST, title, body}
}

export function deletePost(postId) {
  return {type: DELETE_POST, postId}
}

export function commentPost(postId, commentBody) {
  return {type: COMMENT_POST, postId, commentBody}
}

export function rateComment(commentId, rate) {
  return {type: RATE_COMMENT, commentId, rate}
}