import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { types as postsActionTypes } from '../../../store/posts/actions'
import { getNewObjectIdKey, getTimestamp } from '../../../utils'
import { LayoutPage } from '../../ui/layouts'
import { Header } from '../..'
import './style.css'


class PagesPostCreate extends Component {

  static propTypes = {
    user: PropTypes.object,
    posts: PropTypes.object,
    history: PropTypes.object,
    dispatch: PropTypes.func
  }


  state = {title: '', body: '', error: ''}

  handleTitleChange = event => this.setState({title: event.target.value, error: ''})

  handleBodyChange = event => this.setState({body: event.target.value, error: ''})

  onSubmitHandler = event => {
    const { history } = this.props

    event.preventDefault()
    if (this.state.title && this.state.body) {

      this.dispatchAddPost({title: this.state.title, body: this.state.body})
      this.setState({title: '', body: '', error: ''})
      history.goBack()

    } else {
      this.setState({error: 'Please fill in both fields.'})
    }
  }

  dispatchAddPost({ title, body }) {
    const { user, posts, dispatch } = this.props

    const newPost = {
      id: getNewObjectIdKey(posts.items),
      title,
      body,
      authorId: user.id,
      comments: [],
      timestamp: getTimestamp()
    }

    dispatch({type: postsActionTypes.ADD, newPost})
  }


  render() {

    const header = <Header title="Create post" className="PagesPostCreate__header" />

    return (
      <LayoutPage header={header}>
        <form onSubmit={this.onSubmitHandler} className="PagesPostCreate__form">
          <p>Fill in the fields and click submit.</p>
          <input
            type="text"
            onChange={this.handleTitleChange}
            value={this.state.title}
            placeholder="Enter Title"
            className="PagesPostCreate__formItem PagesPostCreate__formInput"
          />
          <textarea
            type="textarea"
            onChange={this.handleBodyChange}
            value={this.state.body}
            placeholder="Your post here"
            className="PagesPostCreate__formItem PagesPostCreate__formTextarea"
          />
          <p className="PagesPostCreate__formError">{this.state.error}</p>
          <button className="PagesPostCreate__formItem PagesPostCreate__formButton" type="submit">Submit</button>
        </form>
      </LayoutPage>
    )
  }
}


export default connect(state => ({
  user: state.user,
  posts: state.posts
}))(PagesPostCreate)