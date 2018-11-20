import React from 'react'

import PagesPostComment from '../comment'
import './style.css'

export default function PagesPostCommentList({ commentsIds }) {
  return commentsIds.length ? (
    <ul className='PagesPostCommentList PagesPostCommentList__ul'>
      {commentsIds.map(id => (
        <li key={id} className="PagesPostCommentList__li">
          <div className="PagesPostCommentList__div">
            <PagesPostComment
              commentId={id}
            />
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className='PagesPostCommentList__empty'><p>There are no comments yet</p></div>
  )
}