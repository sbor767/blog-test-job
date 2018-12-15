const comments = {
  1: {
    id: 1,
    postId: 1,
    authorId: 1,
    body: 'Very amazing thing. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.',
    rates: {1: 4, 2: 5},
    timestamp: 1526571072
  },
  2: {
    id: 2,
    postId: 2,
    authorId: 2,
    body: 'Some some some thing about it. Lorem ipsum ipsum ipsum now such.',
    rates: {1: 2},
    timestamp: 1530159310
  },
  3: {
    id: 3,
    postId: 1,
    authorId: 1,
    body: 'Very amazing thing.',
    rates: {3: 5},
    timestamp: 1530463141
  },
  4: {
    id: 4,
    postId: 4,
    authorId: 3,
    body: 'Wrong way. Do not do it!',
    rates: {2: 5, 3: 3},
    timestamp: 1531829816
  },
  5: {
    id: 5,
    postId: 4,
    authorId: 1,
    body: 'Call to service center.',
    rates: {},
    timestamp: 1531983605
  },
  6: {
    id: 6,
    postId: 1,
    authorId: 2,
    body: 'Up and down please. Make it now.',
    rates: {3: 4},
    timestamp: 1532089336
  },
  7: {
    id: 7,
    postId: 2,
    authorId: 2,
    body: 'Something interesting. Something interesting. Something interesting. Something interesting. Something interesting. Something interesting. Something interesting. Something interesting.',
    rates: {2: 3},
    timestamp: 1532089604
  },
  8: {
    id: 8,
    postId: 4,
    authorId: 3,
    body: 'Very amazing thing. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.',
    rates: {},
    timestamp: 1532079907
  },
  9: {
    id: 9,
    postId: 1,
    authorId: 1,
    body: 'Very amazing thing. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.',
    rates: {2: 5},
    timestamp: 1532153107
  }
}


export default {
  /**
   * @returns {Promise}
   */
  get: function () {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(comments)
        }, 300)
      }
    )
  }

}