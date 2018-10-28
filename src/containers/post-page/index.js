import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'

import Post from './post'
import Loading from '../../components/loading'
import Header from '../../components/header'
import ButtonTo from '../../components/button-to'
import SignInOut from '../../components/sign-in-out'
import CommentList from './comment-list'
import CommentAdd from './comment-add'
import LayoutPage from '../../components/layouts/layout-page'
import LayoutContentItems from '../../components/layouts/layout-content-items'


class PostPage extends Component {

  onCommentSubmitHandler = (comment) => {
    let comments = [...this.state.comments]
    comments.push(comment)
    this.setState({ comments })
  }

  render() {
    const {
      postId,
      user,
      isLoaded,
      users,
      posts,
      history
    } = this.props

    console.log('PostPage-render', this.props)

    return (
      <LayoutPage>
        <Header title={isLoaded ? posts.items[postId].title : 'Loading...'}>
          <SignInOut>
            <ButtonTo title="Back to Home" to={"/"} classes={['blue']}/>
          </SignInOut>
        </Header>


        {isLoaded ? (
          <LayoutContentItems>
            <div className="PostPage__post">
              <Post
                body={posts.items[postId].body}
                author={users.items[posts.items[postId].authorId].name}
                timestamp={posts.items[postId].timestamp}
              />
            </div>
            <hr className="PostPage__hr"/>
            <div className="PostPage__comments">
              <CommentList
                commentsIds={posts.items[postId].comments}
              />
            </div>
            {/* @TODO Change to func isLogged? */}
            {!!user.id ?
              <div className="CommentList__add">
                <CommentAdd
                  history={history}
                  postId={postId}
                  currentUserId={user.id}
                  onSubmit={this.onCommentSubmitHandler}
                />
              </div>
            : ''}
          </LayoutContentItems>
          ) : (
            <Loading/>
          )
        }
      </LayoutPage>
    )
  }
}


const mapStateToProps = state => ({
  user: state.users,
  users: state.users,
  posts: state.posts,
  isLoaded: !state.posts.isFetching && !state.posts.didInvalidate && !state.comments.isFetching && !state.comments.didInvalidate,
})

export default connect(mapStateToProps)(PostPage)