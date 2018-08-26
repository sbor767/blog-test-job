import React, { Component } from 'react'
import Post from './post'
import Loading from '../../components/loading'

const RestApi = require(`../../controllers/RestApi${process.env.DEBUG_REST === 'true' ? 'Sample' : ''}`)

export default class PostPage extends Component {
  state = {body: undefined, bodyLoaded: false, error: undefined}

  componentDidMount() {
  }

  getAuthor = (userId) => {
    return this.props.users.filter(user => user.id === +userId).pop().name
  }
  getCommentCount = (postId) => this.props.comments.filter(comment => comment.post === +postId).length
  getCommentLastTime = (postId) => this.props.comments.filter(comment => comment.post === +postId).reduce((acc, curr) => acc > curr.timestamp ? acc : curr.timestamp, '')

  render() {
    const {
      postId,
      blogPostsLoaded,
      blogPosts,
    } = this.props

    let post = blogPosts.filter(item => item.id === +postId).pop()
    let author = this.getAuthor(post.author)

    return (
      <div>
        {blogPostsLoaded ? (
          <Post
            postId={post.id}
            title={post.title}
            body={post.body}
            author={author}
            timestamp={post.timestamp}
          />
          ) : (
            <Loading/>
          )
        }
      </div>
    )
  }
}