import { LOGOUT } from '../constants'

import { api, storage } from '../lib'

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export default () => {
  return async dispatch => {
    await api.delete('/users')

    await storage.remove('authToken')
    await storage.remove('githubToken')

    dispatch(logout())
  }
}
