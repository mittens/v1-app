import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from 'react-native-dotenv'

import OAuthManager from 'react-native-oauth'

const config = {
  github: {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET
  }
}

const manager = new OAuthManager('gitgud')

manager.configure(config)

export default {
  manager,

  async login(scopes = 'user:email,repo,notifications') {
    return manager.authorize('github', {
      scopes
    })
  }
}
