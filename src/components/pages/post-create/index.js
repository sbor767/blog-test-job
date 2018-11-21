import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { types as postsActionTypes } from '../../../store/posts/actions'
import { getNewObjectIdKey, getTimestamp } from '../../../utils'
import { LayoutPage, LayoutContentItems } from '../../ui/layouts/index'
import { Header } from '../../index'
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

  handleSubmit = event => {
    event.preventDefault()
    if (this.state.title && this.state.body) {
      this.onSubmitHandler({title: this.state.title, body: this.state.body})
      this.setState({title: '', body: '', error: ''})
    } else {
      this.setState({error: 'Please fill in both fields.'})
    }

    console.log(this.state)
  }

  onSubmitHandler({ title, body }) {
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

    this.props.history.push('/')
  }


  render() {

    const header = <Header title="Create post" className="PagesPostCreate__header" />

    return (
      <LayoutPage header={header}>
        <LayoutContentItems>
          <form onSubmit={this.handleSubmit} className="PagesPostCreate__form">
            <p>Sign in or sign up by entering your login and password.</p>
            <input
              type='text'
              onChange={this.handleTitleChange}
              value={this.state.title}
              placeholder='Enter Title'
              className="PagesPostCreate__formInput"
            />
            <textarea
              type='textarea'
              onChange={this.handleBodyChange}
              value={this.state.body}
              placeholder='Your post here'
              className="PagesPostCreate__formTextarea"
            />
            <p className="PagesPostCreate__formError">{this.state.error}</p>
            <button className='PagesPostCreate__formButton' type='submit'>Submit</button>
          </form>
        </LayoutContentItems>
      </LayoutPage>
    )
  }
}


export default connect(state => ({
  user: state.user,
  posts: state.posts
}))(PagesPostCreate)