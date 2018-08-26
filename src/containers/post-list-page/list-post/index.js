import React from 'react'
import {Link} from 'react-router-dom'

import './style.css'
import ButtonTo from '../../../components/button-to'
import Copyright from '../../../components/copyright'
import ListPostComments from '../list-post-comments'

export default function ListPost({ postId, title, author, timestamp, body, comments, lastComment }) {
  return (
        <div className={`message-item`} >
          <Link to={`/posts/${postId}`}>
            <h2 title={`id=${postId}`}>{title}</h2>
            <Copyright author={author} timestamp={lastComment}/>
            {/*<div>By: {author}</div>*/}
            {/*<div>{timestamp}</div>*/}
            <p>{body}</p>
            {/*<button className="blue">Open {messageId}</button>*/}
          </Link>
          <ListPostComments commentsNum={comments} lastTimestamp={lastComment} />
{/*
          <div>
            <div>Comments: {comments}</div>
            {!!comments && (<div>Last: {lastComment}</div>)}
          </div>
*/}
        </div>
  )
}