import {getFormattedTimestamp} from './utils'

export default {
  posts: {
    1: {
      id: 1,
      title: 'Amazing Thirst Thing',
      body: 'Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.',
      authorId: 1,
      timestamp: '2018-05-17 18:31:12'
    },
    2: {
      id: 2,
      title: 'Amazing Second Thing',
      body: 'Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.',
      authorId: 2,
      timestamp: '2018-07-27 10:11:28'
    },
    3: {
      id: 3,
      title: 'Amazing Third Thing',
      body: 'Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.',
      authorId: 3,
      timestamp: '2018-07-28 8:14:13'
    },
    4: {
      id: 4,
      title: 'Amazing New Thing',
      body: 'Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.',
      authorId: 1,
      timestamp: '2018-07-28 10:45:33'
    }
  },

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
      id: Object.keys(this.posts).length + 1,
      title: post.title,
      body: post.body,
      authorId: authorId,
      timestamp: getFormattedTimestamp()
    }
    try {
      this.posts[newPost.id] = newPost
    } catch(e) {
      return Promise.reject(`Wrong Blog post: ${e.message}`)
    }
    return Promise.resolve(newPost)
  }

}