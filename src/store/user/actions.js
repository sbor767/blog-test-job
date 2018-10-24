import * as api from '../../api'

export const types = {
  LOAD: Symbol('INIT CURRENT USER FOR TEST PURPOSE'),
}

export default {
  // Public Methods
  init: () => dispatch => {
    api.user.get().then(data => {
      dispatch({
        type: types.LOAD,
        id: data.id,
        name: data.name
      })
    })
  }
}