import React, { Component } from 'react'
import ReactDom from 'react-dom'

import Header from '../../presentation/Header'
import Loading from '../../presentation/Loading'
import InputBoxContainer from '../../components/InputBoxContainer'
import {Link} from 'react-router-dom'
import BlogPost from '../../components/blog-post'

export default class PostListPage extends Component {

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate(previousProps) {
    if (previousProps.blogPosts.length !== this.props.blogPosts.length) this.scrollToBottom()
  }

  scrollToBottom = () => {
    const headerContainer = ReactDom.findDOMNode(this.headerContainer)
    if (headerContainer) headerContainer.scrollTop = headerContainer.scrollHeight
  }

  render() {
    const {
      blogPostsLoaded,
      blogPosts,
      onSubmit,
    } = this.props

    return (
    <div id="ForumContainer" className="inner-container">
      <Header>
        <Link to={'/create'}>
          <button className="blue">Create POST</button>
        </Link>
        <Link to={'/login'}>
          <button className="blue">SignIn</button>
        </Link>
      </Header>

      {blogPostsLoaded ? (
        <div
          id="message-container"
          ref={element => {
          this.headerContainer = element}}
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

      ) : (
        <Loading />
      )}

      <InputBoxContainer
        onSubmit={onSubmit}
        blogPosts={blogPosts}
      />

    </div>
  )}
}