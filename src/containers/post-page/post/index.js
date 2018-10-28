import React from 'react'

import './style.css'
import Copyright from '../../../components/copyright'

export default function Post({ body, author, timestamp }) {
  return (
    <div id="MessageContainer" className="Post inner-container">
      <div id="message-container">
        <Copyright author={author} timestamp={timestamp}/>
        <div className="Post__body">
          <p>{body}</p>
        </div>
      </div>
    </div>
  )
}