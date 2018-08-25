import React from 'react'
import {Link} from 'react-router-dom'

import './style.css'

export default function ListPost({ postId, title, author, timestamp, body, comments, lastComment }) {
  return (
        <div className={`message-item`} >
          <Link to={`/posts/${postId}`}>
            <h2 title={`id=${postId}`}>{title}</h2>
            <div>By: {author}</div>
            <div>{timestamp}</div>
            <p>{body}</p>
            {/*<button className="blue">Open {messageId}</button>*/}
          </Link>
          <div>
            <div>Comments: {comments}</div>
            {!!comments && (<div>Last: {lastComment}</div>)}
          </div>
        </div>
  )
}