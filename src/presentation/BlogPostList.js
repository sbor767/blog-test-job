import React from 'react'

import BlogPost from './BlogPost'

export default function MessageList({ blogPosts }) {
  return (
    <div
      id="message-container"
      ref={element => {
        this.headerContainer = element
      }}
    >
      {blogPosts.map(current => (
        <BlogPost
          key={`post_id-${current.id}`}
          postId={current.id}
          title={current.title}
          author={current.author}
          timstamp={current.timestamp}
          body={current.body}
          comments={current.comments}
          lastComment={current.lastComment}
        />
      ))}
    </div>
  )
}