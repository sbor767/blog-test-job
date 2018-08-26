import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

export default function CommentList({ postId, title, body, author, timestamp }) {
  return (
    <div className="CommentList">
      <Header title={title}>
{/*
        <Link to="/">
          <button className="blue">Back To Home</button>
        </Link>
*/}
        <ButtonTo title="Back to Home" to={"/"} classes={['blue']}/>
        {/*<button className="red">Delete</button>*/}
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