import {getFormattedTimestamp} from './utils'

export default {
  posts: [
    {
      id: 1,
      title: 'Amazing Thirst Thing',
      author: 1,
      timestamp: '2018-05-17 18:31:12',
      body: 'Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.'
    },
    {
      id: 2,
      title: 'Amazing Second Thing',
      author: 2,
      timestamp: '2018-07-27 10:11:28',
      body: 'Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.'
    },
    {
      id: 3,
      title: 'Amazing Third Thing',
      author: 3,
      timestamp: '2018-07-28 8:14:13',
      body: 'Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.'
    },
    {
      id: 4,
      title: 'Amazing New Thing',
      author: 1,
      timestamp: '2018-07-28 10:45:33',
      body: 'Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.'
    }
  ],

  /**
   * Signin
   * @returns {Promise}
   */
  get: function(id = undefined) {
    if (!id) return Promise.resolve(this.posts)
    let post = this.posts.filter(post => post.id === +id).pop()
    if (post) return post
    return Promise.reject(`Not post exist with id=${id}`)
  },

  add: function(post, authorId) {
    let newPost = {
      id: this.posts.length + 1,
      title: post.title,
      body: post.body,
      author: authorId,
      timestamp: getFormattedTimestamp()
    }
    try {
      this.posts.push(newPost)
    } catch(e) {
      return Promise.reject(`Wrong Blog post: ${e.message}`)
    }
    return Promise.resolve(newPost)
  }

}