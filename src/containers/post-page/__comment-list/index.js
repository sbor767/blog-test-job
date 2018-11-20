import React from 'react'

import './style.css'
import Comment from '../__comment'

export default function CommentList({ commentsIds }) {
  return (
    <div className="CommentList">
      <div className="CommentList__title">
        <span>Comments</span>
      </div>
      {commentsIds.length ? (
        <ul className="CommentList__ul">
          {commentsIds.map(id => (
            <li key={id} className="CommentList__li">
              <div className="CommentList__div">
                <Comment
                  commentId={id}
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