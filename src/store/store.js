import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'

import * as reducers from './reducers'

const middleware = [ thunkMiddleware ]
if (process.env.NODE_ENV !== 'production') {
  // middleware.push(createLogger())
}


export default createStore(
  combineReducers(reducers),
  applyMiddleware(...middleware)
)