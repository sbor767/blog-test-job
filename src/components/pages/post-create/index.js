import React, { Component } from 'react'

import posts from '../../../api/rest-like/posts'

import { Header } from '../../index'
import { LayoutPage, LayoutContentItems } from '../../ui/layouts/index'
import './style.css'


export default class PagesPostCreate extends Component {
  state = {title: '', body: '', error: ''}

  handleTitleChange = event => this.setState({title: event.target.value, error: ''})

  handleBodyChange = event => this.setState({body: event.target.value, error: ''})

  handleSubmit = event => {
    event.preventDefault()
    this.setState({error: ''})
    if (this.state.title && this.state.body) {
      this.save({title: this.state.title, body: this.state.body})
    } else {
      this.setState({error: 'Please fill in both fields.'})
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
        this.setState({error: `Error when saving post: ${err}`})
      })
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
            <p className="error PagesPostCreate__formError">{this.state.error}</p>
            <button className='red light PagesPostCreate__formButton' type='submit'>Submit</button>
          </form>
        </LayoutContentItems>
      </LayoutPage>
    )
  }
}