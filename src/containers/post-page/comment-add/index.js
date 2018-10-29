import React, { Component } from 'react'

import './style.css'

export default class CommentAdd extends Component {
  state = { body: '', error: '' }

  handleBodyChange = event => this.setState({ body: event.target.value, error: '' })

  handleSubmit = event => {
    event.preventDefault()
    if (this.state.body) {
      this.submit(this.state.body)
      this.setState({ body: '', error: '' })
    } else {
      this.setState({ error: 'Please fill comment fields.' })
    }
  }

  submit(commentBody) {
    const { onSubmit } = this.props
    try {
      onSubmit(commentBody)
    } catch (e) {
      this.setState({ error: `Error when saving comment: ${e}` })
    }
    // this.onSubmit()
  }

/*
  onSubmit() {
    // Redirect to '/'.
    console.log('onSubmit--this.props', this.props)
    console.log('onSubmit--this.props.path', `/posts/${this.props.postId}`)
    // this.props.history.push('/')
    this.props.history.push(`/posts/${this.props.postId}`)
  }
*/

  render = () => (
    <div className='CommentAdd'>
      <form onSubmit={this.handleSubmit} className="CommentAdd__form">
        <p>Add your comment</p>
        <textarea
          type='textarea'
          onChange={this.handleBodyChange}
          value={this.state.body}
          placeholder='Your comment here'
          className="CommentAdd__form__textarea"
        />
        <p className="error CommentAdd__form__error">{this.state.error}</p>
        <button className='red light CommentAdd__form__button' type='submit'>Submit</button>
      </form>
    </div>
  )
}