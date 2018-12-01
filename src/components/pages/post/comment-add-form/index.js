import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default class PagesPostCommentAddForm extends Component {

  static propTypes = {
    postId: PropTypes.number.isRequired,
    onSubmit: PropTypes.func
  }


  state = { body: '', error: '' }

  handleBodyChange = event => this.setState({ body: event.target.value, error: '' })

  handleSubmit = event => {
    event.preventDefault()
    if (this.state.body) {
      this.submit(this.state.body)
      this.setState({ body: '', error: '' })
    } else {
      this.setState({ error: 'Please fill comment field.' })
    }
  }

  submit(commentBody) {
    const { onSubmit } = this.props
    try {
      onSubmit(commentBody)
    } catch (e) {
      this.setState({ error: `Error when saving comment: ${e}` })
    }
  }


  render = () => (
    <form onSubmit={this.handleSubmit} className="PagesPostCommentAddForm">
      <p>Add your comment</p>
      <textarea
        type="textarea"
        onChange={this.handleBodyChange}
        value={this.state.body}
        placeholder="Your comment here"
        className="PagesPostCommentAddForm__formTextarea"
      />
      <p className="PagesPostCommentAddForm__formError">{this.state.error}</p>
      <button className="PagesPostCommentAddForm__formButton" type="submit">Submit</button>
    </form>
  )
}