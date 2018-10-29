// import {getFormattedTimestamp} from './utils'

export default {
  posts: {
    1: {
      id: 1,
      title: 'Amazing Thirst Thing',
      body: 'Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.',
      authorId: 1,
      comments: [5, 9],
      timestamp: 1526571072
    },
    2: {
      id: 2,
      title: 'Amazing Second Thing',
      body: 'Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.',
      authorId: 2,
      comments: [1, 3, 4],
      timestamp: 1532675488
    },
    3: {
      id: 3,
      title: 'Amazing Third Thing',
      body: 'Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.',
      authorId: 3,
      comments: [2, 6, 7, 8],
      timestamp: 1532754853
    },
    4: {
      id: 4,
      title: 'Amazing New Thing',
      body: 'Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.',
      authorId: 1,
      comments: [],
      timestamp: 1532763933
    }
  },

  /**
   * Signin
   * @returns {Promise}
   */
  get: function(id = undefined) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!id) resolve(this.posts)

        if (!!this.posts[id]) resolve(this.posts[id])

        reject(`No post exist with id=${id}`)
      }, 300)}
    )
  },

/*
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
  },
*/

/*
  comment: function(postId, commentId) {
    if (!this.posts[postId]) return Promise.reject(`No post exist with id=${postId}`)
    this.posts[postId].comments.push(commentId)
    return Promise.resolve(this.posts[postId].comments)
  },
*/

  // Fake method
/*
  delete: function(postId) {
    return Promise.resolve(1)
  }
*/

}