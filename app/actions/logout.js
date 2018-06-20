import { LOGOUT } from '../constants'

import { api, storage } from '../lib'

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export default () => {
  return async dispatch => {
    try {
      await api.delete('/users/me')

      await storage.remove('authToken')
      await storage.remove('githubToken')
    } catch (err) {
    } finally {
      dispatch(logout())
    }
  }
}
