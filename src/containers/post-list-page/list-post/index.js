import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import './style.css'
import Copyright from '../../../components/copyright'
import ListPostCommentsInfo from '../list-post-comments-info'

export default function ListPost({ postId, title, author, timestamp, body, commentsCount, lastComment, className }) {
  return (
        <div className={cn('ListPost', className)}>
          <Link to={`/posts/${postId}`} className='ListPost__link'>
            <h2 title={`id=${postId}`} className='ListPost__title'>{title}</h2>
            <Copyright author={author} timestamp={timestamp} className='ListPost__copyright'/>
            <div className='ListPost__body'>{body}</div>
          </Link>
          <ListPostCommentsInfo commentsNum={commentsCount} lastTimestamp={lastComment} className='ListPost__commentInfo'/>
        </div>
  )
}