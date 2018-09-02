import React, { Component } from 'react'
import Header from '../../components/header'

import posts from '../../api/rest-like/posts'
import './style.css'
import LayoutPage from '../../components/layouts/layout-page'
import LayoutContentItems from '../../components/layouts/layout-content-items'

export default class PostCreatePage extends Component {
  state = { title: '', body: '', error: '' }

  handleTitleChange = event => this.setState({ title: event.target.value, error: '' })

  handleBodyChange = event => this.setState({ body: event.target.value, error: '' })

  handleSubmit = event => {
    event.preventDefault()
    this.setState({ error: '' })
    if (this.state.title && this.state.body) {
      this.save({ title: this.state.title, body: this.state.body })
    } else {
      this.setState({ error: 'Please fill in both fields.' })
    }

    console.log(this.state)
  }

  onSubmit() {
    // Redirect to '/'.
    this.props.history.push('/')
  }

  save(post) {
    posts.add(post, this.props.currentUserId)
      .then(newPost => {
        this.props.onSubmit(newPost)
        this.onSubmit()
      })
      .catch(err => {
        this.setState({ error: `Error when saving post: ${err}` })
      })
  }

  render = () => (
    <LayoutPage>
      <Header title="The BLOG" />
      <LayoutContentItems>
        <form onSubmit={this.handleSubmit} className="PostCreatePage__form">
          <p>Sign in or sign up by entering your login and password.</p>
          <input
            type='text'
            onChange={this.handleTitleChange}
            value={this.state.title}
            placeholder='Enter Title'
            className="PostCreatePage__form__input"
          />
          <textarea
            type='textarea'
            onChange={this.handleBodyChange}
            value={this.state.body}
            placeholder='Your post here'
            className="PostCreatePage__form__textarea"
          />
          <p className="error PostCreatePage__form__error">{this.state.error}</p>
          <button className='red light PostCreatePage__form__button' type='submit'>Submit</button>
        </form>
      </LayoutContentItems>
    </LayoutPage>
  )
}