export default {
  users: {
    1: {
      id: 1,
      name: 'John N.'
    },
    2: {
      id: 2,
      name: 'Alexandr M.'
    },
    3: {
      id: 3,
      name: 'Leonardo D.'
    }
  },

  secretUserData: {
    1: "111",
    2: "222",
    3: "333",
    4: "444",
  },

  /**
   * Signin
   * @returns {Promise}
   */
  get: function() {return Promise.resolve(this.users)},

  getUserLogged: function(data) {
    const failMsg = 'Wrong credentials!'
    if (!data.login || !data.password) return Promise.reject(failMsg)
    let user = this.users.filter(current => current.name === data.login).pop()
    return !!user.id && !!this.secretUserData[user.id] && this.secretUserData[user.id] === data.password ? Promise.resolve(user) : Promise.reject(failMsg)
  }

}