import { combineReducers } from 'redux'

import token from './token'
import user from './user'

import all from './all'
import unread from './unread'

import state from './state'

export default combineReducers({
  token,
  user,

  all,
  unread,

  state
})
