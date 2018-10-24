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

})