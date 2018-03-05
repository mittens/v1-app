import { Platform } from 'react-native'

import { LOGIN } from '../constants'

import { api, dialog, firebase, storage } from '../lib'

import { getUserPending } from './get-user'
import { logout } from './logout'

export const login = data => {
  return {
    type: LOGIN,
    data
  }
}

export default code => {
  return async (dispatch, getState) => {
    dispatch(getUserPending())

    try {
      const { config } = getState()

      const { data } = config
      const { base, android, ios } = data

      const github = Platform.OS === 'android' ? android : ios

      const { id, secret } = github

      const response = await fetch(
        `${base}/access_token?client_id=${id}&client_secret=${secret}&code=${code}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )

      const json = await response.json()

      const { access_token: githubToken } = json

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
      dispatch(logout())

      dialog.alert(err.message)
    }
  }
}
