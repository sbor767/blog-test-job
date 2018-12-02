import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import { Copyright } from '../../../'
import PagesPostsListCommentInfo from '../comment-info'
import './style.css'

export default function PagesPostsListPost({ postId, title, author, timestamp, body, commentsCount, lastComment, className }) {
  return (
    <div className={cn('PagesPostsListPost', className)}>

      <Link to={`/posts/${postId}`} className="PagesPostsListPost__link">
        <div className="PagesPostsListPost__header">
          <div className="PagesPostsListPost__titleWrapper">
            <h2 title={`id=${postId}`} className="PagesPostsListPost__title">{title}</h2>
            <Copyright author={author} timestamp={timestamp} className="PagePostsListPost__copyright"/>
          </div>
          <PagesPostsListCommentInfo commentsNum={commentsCount} lastTimestamp={lastComment}/>
        </div>
        <div className="PagesPostsListPost__body">{body}</div>
      </Link>

    </div>
  )
}