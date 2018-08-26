import React, { Component } from 'react'
import Header from '../../../components/header'

import RestApi from '../../../controllers/RestApi'
import './style.css'

export default class CommentAdd extends Component {
  state = { body: '', error: '' }

  handleBodyChange = event => this.setState({ body: event.target.value, error: '' })

  handleSubmit = event => {
    event.preventDefault()
    this.setState({ error: '' })
    if (this.state.body) {
      this.save({ body: this.state.body })
      this.setState({ body: '', error: '' })
    } else {
      this.setState({ error: 'Please fill comment fields.' })
    }

    console.log(this.state)
  }

  onSubmit() {
    // Redirect to '/'.
    console.log('onSubmit--this.props', this.props)
    console.log('onSubmit--this.props.path', `/posts/${this.props.postId}`)
    // this.props.history.push('/')

    this.props.history.push(`/posts/${this.props.postId}`)
  }

  save(commentBody) {
    RestApi.addComment(commentBody, this.props.postId, this.props.currentUserId)
      .then(newComment => {
        this.props.onSubmit(newComment)
        this.onSubmit()
      })
      .catch(err => {
        this.setState({ error: `Error when saving comment: ${err}` })
      })
  }

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