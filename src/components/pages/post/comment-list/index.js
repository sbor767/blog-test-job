import React from 'react'

import PagesPostComment from '../comment'
import './style.css'

export default function PagesPostCommentList({ commentsIds }) {

  return <div className="PagesPostCommentList">
    {commentsIds.length ?
      commentsIds.map(id => <PagesPostComment key={id} commentId={id}/>)
      :
      <div className="PagesPostCommentList__empty">There are no comments yet.</div>
    }
  </div>
}