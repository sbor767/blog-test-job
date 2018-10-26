import reducer from '../../utils/reducer'
import {types} from './actions.js'

const initState = {
  id: null,
  name: 'Guest'
}


export default reducer(initState, {

  [types.LOAD]: (state, action) => {
    return {
      ...state,
      id: action.id,
      name: action.name
    }
  },

  [types.SIGN_IN]: (state, action) => {
    return {
      ...state,
      id: action.id,
      name: action.name
    }
  },

  [types.SIGN_OUT]: (state) => {
    return {
      ...state,
      id: initState.id,
      name: initState.name
    }
  },

})