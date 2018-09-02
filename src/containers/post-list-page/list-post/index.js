import React from 'react'
import {Link} from 'react-router-dom'

import './style.css'
import Copyright from '../../../components/copyright'
import ListPostComments from '../list-post-comments'

export default function ListPost({ postId, title, author, timestamp, body, comments, lastComment }) {
  return (
        <div className={`message-item`} >
          <Link to={`/posts/${postId}`}>
            <h2 title={`id=${postId}`}>{title}</h2>
            <Copyright author={author} timestamp={lastComment}/>
            <p>{body}</p>
          </Link>
          <ListPostComments commentsNum={comments} lastTimestamp={lastComment} />
        </div>
  )
}