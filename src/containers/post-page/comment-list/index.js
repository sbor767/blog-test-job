import React from 'react'

import './style.css'
import Comment from '../comment'

export default function CommentList({ postId, postComments, currentUserId, history, onCommentSubmit, getAuthor }) {
  return (
    <div className="CommentList">
      <div className="CommentList__title">
        <span>Comments</span>
      </div>
      {!!postComments && postComments.length ? (
        <ul className="CommentList__ul">
          {postComments.map(comment => (
            <li key={comment.id} className="CommentList__li">
              <div className="CommentList__div">
                <Comment
                  comment={comment}
                  getAuthor={getAuthor}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="CommentList__empty"><p>There are no comments yet</p></div>
      )}
    </div>
  )
}