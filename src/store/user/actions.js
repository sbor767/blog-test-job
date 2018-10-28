import * as api from '../../api'

export const types = {
  LOAD: Symbol('INIT CURRENT USER FOR TEST PURPOSE'),
  SIGN_IN: Symbol('USER SIGN IN'),
  SIGN_OUT: Symbol('USER SIGN OUT'),
}

export default {

  init: () => dispatch => {
    api.user.getTestSampleUser().then(data => {
      dispatch({
        type: types.LOAD,
        id: data.id,
        name: data.name
      })
    })
  },

  signIn: user => dispatch => {
    dispatch({
      type: types.SIGN_IN,
      id: user.id,
      name: user.name
    })
  },

  signOut: () => dispatch => {
    dispatch({type: types.SIGN_OUT})
  }
}