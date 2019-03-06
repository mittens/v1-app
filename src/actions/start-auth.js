import { GITHUB_CLIENT_ID } from 'react-native-dotenv'

import { Linking } from 'react-native'
import parse from 'url-parse'

import { dialog } from '../lib'

import { getUserFailure } from './get-user'
import login from './login'

export default () => async dispatch => {
  try {
    Linking.openURL(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=notifications&allow_signup=false`
    )

    Linking.addEventListener('url', ({ url }) => {
      const {
        query: { code }
      } = parse(url, true)

      dispatch(login(code))

      Linking.removeAllListeners('url')
    })
  } catch (error) {
    dispatch(getUserFailure(error))

    const { message } = error

    dialog.alert(message)
  }
}
