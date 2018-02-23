import { combineReducers } from 'redux'

import token from './token'

import config from './config'
import user from './user'

import all from './all'
import unread from './unread'
import profile from './profile'

export default combineReducers({
  token,

  config,
  user,

  all,
  unread,
  profile
})
