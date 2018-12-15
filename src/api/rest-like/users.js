const users = {
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
}


export default {

  /**
   * Signin
   * @returns {Promise}
   */
  get: function() {return Promise.resolve(users)}

}