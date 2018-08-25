import React, { Component } from 'react'
import Post from './post'

const RestApi = require(`../../controllers/RestApi${process.env.DEBUG_REST === 'true' ? 'Sample' : ''}`)

export default class PostPage extends Component {
  state = { body: undefined, bodyLoaded: false, error: undefined }

  componentDidMount() {
    const { messageId } = this.props
    RestApi.getOneBody(messageId)
      .then(body => this.setState({
          body,
          bodyLoaded: true,
          error: undefined
        })
      )
      .catch(error => {
        console.log('RestApi.getOneBody error: ', error)
        this.setState({
          body: undefined,
          bodyLoaded: false,
          error
        })
      })
  }

  render() {
    const {
      headers,
      messageId
    } = this.props

    return <Post
      // @TODO Check this !!!
      header={!!headers[messageId] ? headers[messageId] : ''}
      isBodyLoaded={this.state.bodyLoaded}
      body={this.state.body}
    />
  }
}