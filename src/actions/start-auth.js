import { GITHUB_CLIENT_ID } from 'react-native-dotenv'

import { Linking } from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import parse from 'url-parse'

import { dialog } from '../lib'

import { getUserFailure } from './get-user'
import login from './login'

export default () => async dispatch => {
  try {
    InAppBrowser.open(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=notifications&allow_signup=false`
    )

    Linking.addEventListener('url', ({ url }) => {
      InAppBrowser.close()

      const {
        query: { code }
      } = parse(url, true)

      dispatch(login(code))

      if (Linking.listeners().length > 0) {
        Linking.removeAllListeners()
      }
    })
  } catch (error) {
    dispatch(getUserFailure(error))

    const { message } = error

    dialog.alert(message)
  }
}
