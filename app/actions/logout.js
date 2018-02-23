import { LOGOUT } from '../constants'

import { storage } from '../lib'

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export default () => {
  return async dispatch => {
    await storage.remove('authToken')
    await storage.remove('githubToken')

    dispatch(logout())
  }
}
