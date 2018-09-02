import {getFormattedTimestamp} from './utils'

export default {
  comments: [
    {
      id: 1,
      author: 1,
      timestamp: "2018-05-17 18:31:12",
      post: 1,
      body:"Very amazing thing. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.",
    },
    {
      id: 2,
      author: 2,
      timestamp:"2018-06-28 7:15:10",
      post: 2,
      body:"Some some some thing about it. Lorem ipsum ipsum ipsum now such.",
    },
    {
      id: 3,
      author: 1,
      timestamp:"2018-07-01 19:39:01",
      post: 1,
      body:"Very amazing thing.",
    },
    {
      id: 4,
      author: 3,
      timestamp:"2018-07-17 15:16:56",
      post: 4,
      body:"Wrong way. Do not do it!",
    },
    {
      id: 5,
      author: 1,
      timestamp:"2018-07-19 10:00:05",
      post: 4,
      body:"Call to service center.",
    },
    {
      id: 6,
      author: 2,
      timestamp:"2018-07-20 15:22:16",
      post: 1,
      body:"Up and down please. Make it now.",
    },
    {
      id: 7,
      author: 2,
      timestamp:"2018-07-20 15:26:44",
      post: 2,
      body:"Something interesting. Something interesting. Something interesting. Something interesting. Something interesting. Something interesting. Something interesting. Something interesting.",
    },
    {
      id: 8,
      author: 3,
      timestamp:"2018-07-20 12:45:07",
      post: 4,
      body:"Very amazing thing. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.",
    },
    {
      id: 9,
      author: 1,
      timestamp:"2018-07-21 09:05:07",
      post: 1,
      body:"Very amazing thing. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.",
    },
  ],

  /**
   * Signin
   * @returns {Promise}
   */
  get: function() {return Promise.resolve(this.comments)},

  add: function(comment, postId, authorId) {
    let newComment = {
      id: this.comments.length + 1,
      author: authorId,
      post: postId,
      body: comment.body,
      timestamp: getFormattedTimestamp()
    }
    try {
      this.comments.push(newComment)
    } catch(e) {
      return Promise.reject(`Error saving comment: ${e.message}`)
    }
    return Promise.resolve(newComment)
}

}