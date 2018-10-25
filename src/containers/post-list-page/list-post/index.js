import React from 'react'
import {Link} from 'react-router-dom'

import './style.css'
import Copyright from '../../../components/copyright'
import ListPostCommentsInfo from '../list-post-comments-info'

export default function ListPost({ postId, title, author, timestamp, body, commentsCount, lastComment }) {
  return (
        <div className={`message-item`} >
          <Link to={`/posts/${postId}`}>
            <h2 title={`id=${postId}`}>{title}</h2>
            <Copyright author={author} timestamp={timestamp}/>
            <p>{body}</p>
          </Link>
          <ListPostCommentsInfo commentsNum={commentsCount} lastTimestamp={lastComment} />
        </div>
  )
}