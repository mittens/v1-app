import {
  GITHUB_CLIENT_ID_IOS,
  GITHUB_CLIENT_SECRET_IOS,
  GITHUB_CLIENT_ID_ANDROID,
  GITHUB_CLIENT_SECRET_ANDROID
} from 'react-native-dotenv'

import { Platform } from 'react-native'
import OAuthManager from 'react-native-oauth'

const ios = Platform.OS === 'ios'

const client_id = ios ? GITHUB_CLIENT_ID_IOS : GITHUB_CLIENT_ID_ANDROID
const client_secret = ios
  ? GITHUB_CLIENT_SECRET_IOS
  : GITHUB_CLIENT_SECRET_ANDROID

const config = {
  github: {
    client_id,
    client_secret
  }
}

const manager = new OAuthManager('gitgud')

manager.configure(config)

export default {
  manager,

  async login(scopes = 'user:email,repo,notifications') {
    const response = await manager.authorize('github', {
      scopes
    })

    if (response.status === 'ok') {
      return response.response
    }

    throw new Error()
  }
}
