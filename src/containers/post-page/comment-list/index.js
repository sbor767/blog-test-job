import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

export default function Comment({ commentId, body, author, timestamp }) {
  return (
    <div className="CommentList">
      <Header title={title}>
        <ButtonTo title="Back to Home" to={"/"} classes={['blue']}/>
      </Header>
      <div id="message-container">
        <Copyright author={author} timestamp={timestamp}/>
        <div className="Post__body">
          <p>{body}</p>
        </div>
      </div>
    </div>
  )
}