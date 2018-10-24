import * as api from '../../api'

export const types = {
  LOAD: Symbol('INIT USERS'),
}

export default {

  init: () => dispatch => {
    api.users.get().then(data => {
      dispatch({
        type: types.LOAD,
        items: data
      })
    })
  }
}