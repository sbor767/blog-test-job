import {getFormattedTimestamp} from './utils'

export default {
  comments: {
    1: {
      id: 1,
      postId: 1,
      authorId: 1,
      body:"Very amazing thing. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.",
      timestamp: "2018-05-17 18:31:12",
    },
    2: {
      id: 2,
      postId: 2,
      authorId: 2,
      body:"Some some some thing about it. Lorem ipsum ipsum ipsum now such.",
      timestamp:"2018-06-28 7:15:10",
    },
    3: {
      id: 3,
      postId: 1,
      authorId: 1,
      body:"Very amazing thing.",
      timestamp:"2018-07-01 19:39:01",
    },
    4: {
      id: 4,
      postId: 4,
      authorId: 3,
      body:"Wrong way. Do not do it!",
      timestamp:"2018-07-17 15:16:56",
    },
    5: {
      id: 5,
      postId: 4,
      authorId: 1,
      body:"Call to service center.",
      timestamp:"2018-07-19 10:00:05",
    },
    6: {
      id: 6,
      postId: 1,
      authorId: 2,
      body:"Up and down please. Make it now.",
      timestamp:"2018-07-20 15:22:16",
    },
    7: {
      id: 7,
      postId: 2,
      authorId: 2,
      body:"Something interesting. Something interesting. Something interesting. Something interesting. Something interesting. Something interesting. Something interesting. Something interesting.",
      timestamp:"2018-07-20 15:26:44",
    },
    8: {
      id: 8,
      postId: 4,
      authorId: 3,
      body:"Very amazing thing. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.",
      timestamp:"2018-07-20 12:45:07",
    },
    9: {
      id: 9,
      postId: 1,
      authorId: 1,
      body:"Very amazing thing. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.",
      timestamp:"2018-07-21 09:05:07",
    },
  },

  /**
   * @returns {Promise}
   */
  get: function() {return Promise.resolve(this.comments)},

  add: function(comment, postId, authorId) {
    let newComment = {
      id: Object.keys(this.comments).length + 1,
      authorId: authorId,
      post: postId,
      body: comment.body,
      timestamp: getFormattedTimestamp()
    }
    try {
      this.comments[newComment.id] = newComment
    } catch(e) {
      return Promise.reject(`Error saving comment: ${e.message}`)
    }
    return Promise.resolve(newComment)
}

}