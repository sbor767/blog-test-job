import React from 'react'

import { getStringFromTimestamp } from '../../utils'
import './style.css'

export default function Copyright({ author, timestamp }) {
  return (
        <div className="Copyright">
          <div className="Copyright__author">By: {author}</div>
          <div className="Copyright__timestamp">{getStringFromTimestamp(timestamp)}</div>
        </div>
  )
}