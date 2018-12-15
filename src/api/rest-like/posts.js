const posts = {
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
}


export default {

  /**
   * Signin
   * @returns {Promise}
   */
  get: function (id = undefined) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!id) resolve(posts)

          if (!!posts[id]) resolve(posts[id])

          reject(`No post exist with id=${id}`)
        }, 300)
      }
    )
  }
}