import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import './style.css'
import Copyright from '../../../components/copyright'
import __ListPostCommentsInfo from '../__list-post-comments-info'

export default function __ListPost({ postId, title, author, timestamp, body, commentsCount, lastComment, className }) {
  return (
        <div className={cn('__ListPost', className)}>
          <Link to={`/posts/${postId}`} className='__ListPost__link'>
            <h2 title={`id=${postId}`} className='__ListPost__title'>{title}</h2>
            <Copyright author={author} timestamp={timestamp} className='__ListPost__copyright'/>
            <div className='__ListPost__body'>{body}</div>
          </Link>
          <__ListPostCommentsInfo commentsNum={commentsCount} lastTimestamp={lastComment} className='__ListPost__commentInfo'/>
        </div>
  )
}