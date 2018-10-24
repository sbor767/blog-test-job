import reducer from '../../utils/reducer'
import {types} from './actions.js'

const initState = {
  items: {}
}


export default reducer(initState, {

  [types.LOAD]: (state, action) => {
    return {
      ...state,
      items: action.items
    }
  },

})