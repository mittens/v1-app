import { combineReducers } from 'redux'

import token from './token'
import user from './user'

import state from './state'

export default combineReducers({
  token,
  user,

  state
})
