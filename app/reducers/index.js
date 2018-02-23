import { combineReducers } from 'redux'

import token from './token'
import user from './user'

import all from './all'
import unread from './unread'

export default combineReducers({
  token,
  user,

  all,
  unread
})
