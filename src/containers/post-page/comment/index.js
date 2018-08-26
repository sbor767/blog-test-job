import React from 'react'

import './style.css'
import Copyright from '../../../components/copyright'

export default function Comment({ comment, getAuthor }) {
  return (
    <div className="Comment">
      <div className="Comment__body">
        {comment.body}
      </div>
      <div className="Comment__copyright">
        <Copyright author={getAuthor(comment.author)} timestamp={comment.timestamp}/>
      </div>
    </div>
  )
}