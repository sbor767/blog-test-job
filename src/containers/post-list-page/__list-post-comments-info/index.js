import React from 'react'

import { getStringFromTimestamp } from '../../../utils'
import './style.css'

export default function ListPostCommentsInfo({ commentsNum, lastTimestamp }) {
  return (
        <div className="ListPostCommentsInfo">
          <div className="ListPostCommentsInfo__num">Comments: {commentsNum}</div>
          {!!commentsNum && (<div className="ListPostCommentsInfo__last">Last: {getStringFromTimestamp(lastTimestamp)}</div>)}
        </div>
  )
}