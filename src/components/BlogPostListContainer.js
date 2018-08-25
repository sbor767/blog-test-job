import React, { Component } from 'react'
import ReactDom from 'react-dom'

import Header from '../presentation/Header'
import Loading from '../presentation/Loading'
import BlogPostList from '../presentation/BlogPostList'
import InputBoxContainer from './InputBoxContainer'
import {Link} from 'react-router-dom'

export default class BlogPostListContainer extends Component {

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
        <BlogPostList
          blogPosts={blogPosts}
        />
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