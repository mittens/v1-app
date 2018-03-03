import { LOGIN } from '../constants'

import { api, dialog, firebase, storage } from '../lib'

import { getUserPending } from './get-user'

export const login = data => {
  return {
    type: LOGIN,
    data
  }
}

export default githubToken => {
  return async dispatch => {
    dispatch(getUserPending())

    try {
      const deviceToken = await firebase.token()

      const { user } = await api.post('/users', {
        user: {
          deviceToken,
          githubToken
        }
      })

      const { authToken } = user

      await storage.put('authToken', authToken)
      await storage.put('githubToken', githubToken)

      dispatch(login(user))
    } catch (err) {
      dialog.alert(err.message)
    }
  }
}
