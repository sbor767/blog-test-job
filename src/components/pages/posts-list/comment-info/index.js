import React from 'react'

import { getStringFromTimestamp } from '../../../../utils'
import './style.css'


export default function PagesPostsListCommentInfo({ commentsNum, lastTimestamp }) {
  return (
        <div className="PagesPostsListCommentInfo">
          <div className="PagesPostsListCommentInfo__num">Comments: {commentsNum}</div>
          {!!commentsNum && (<div className="PagesPostsListCommentInfo__last">Last: {getStringFromTimestamp(lastTimestamp)}</div>)}
        </div>
  )
}