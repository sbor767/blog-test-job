import React from 'react'

import './style.css'

export default function ListPostComments({ commentsNum, lastTimestamp }) {
  return (
        <div className="ListPostComments">
          <div className="ListPostComments__num">Comments: {commentsNum}</div>
          {!!commentsNum && (<div className="ListPostComments__last">Last: {lastTimestamp}</div>)}
        </div>
  )
}