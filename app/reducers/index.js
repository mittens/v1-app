import { combineReducers } from 'redux'

import token from './token'

import config from './config'
import user from './user'

import notifications from './notifications'
import profile from './profile'

export default combineReducers({
  token,

  config,
  user,

  notifications,
  profile
})
