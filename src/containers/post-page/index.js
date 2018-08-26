import React, { Component } from 'react'
import Post from './post'
import Loading from '../../components/loading'
import Header from '../../components/header'
import ButtonTo from '../../components/button-to'
import SignInOut from '../../components/sign-in-out'

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
      user,
      postId,
      blogPostsLoaded,
      blogPosts,
      onSignOut
    } = this.props

    let post = blogPosts.filter(item => item.id === +postId).pop()
    let author = this.getAuthor(post.author)

    return (
      <div>
        <Header title={post.title}>
          <SignInOut user={user} onSignOut={onSignOut}>
            <ButtonTo title="Back to Home" to={"/"} classes={['blue']}/>
          </SignInOut>
        </Header>

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