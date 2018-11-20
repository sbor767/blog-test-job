import React from 'react'

import './style.css'
import Comment from '../__comment'

export default function __CommentList({ commentsIds }) {
  return commentsIds.length ? (
    <ul className='__CommentList __CommentList__ul'>
      {commentsIds.map(id => (
        <li key={id} className="__CommentList__li">
          <div className="__CommentList__div">
            <Comment
              commentId={id}
            />
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className='__CommentList __CommentList__empty'><p>There are no comments yet</p></div>
  )
}