import usersApi from './users'

const secretUserData = {
  1: '111',
  2: '222',
  3: '333'
}


export default {
  /**
   * Signin
   * @returns {Promise}
   */
  getTestSampleUser: () => Promise.resolve({
    id: 3,
    name: 'Leonardo D.'
  }),

  userLogin: async function(data) {
    const failMsg = 'Wrong credentials!'
    if (!data.login || !data.password) return Promise.reject(failMsg)
    const users = await usersApi.get()
    const userId = Object.keys(users).filter(key => users[key].name.toLowerCase() === data.login.toLowerCase()).pop()
    return !!userId && !!secretUserData[userId] && secretUserData[userId] === data.password ? Promise.resolve(users[userId]) : Promise.reject(failMsg)
  }
}