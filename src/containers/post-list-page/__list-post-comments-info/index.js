import React from 'react'

import { getStringFromTimestamp } from '../../../utils'
import './style.css'

export default function __ListPostCommentsInfo({ commentsNum, lastTimestamp }) {
  return (
        <div className="__ListPostCommentsInfo">
          <div className="__ListPostCommentsInfo__num">Comments: {commentsNum}</div>
          {!!commentsNum && (<div className="__ListPostCommentsInfo__last">Last: {getStringFromTimestamp(lastTimestamp)}</div>)}
        </div>
  )
}