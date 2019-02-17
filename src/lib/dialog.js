import { AlertIOS } from 'react-native'

export default class Dialog {
  static alert(message) {
    AlertIOS.alert(null, message, [
      {
        text: 'okay'
      }
    ])
  }

  static login() {
    return new Promise(resolve =>
      AlertIOS.prompt(
        'login with personal access token',
        'create a personal access token on `GitHub > Settings > Developer settings > Personal access tokens` and paste here',
        [
          {
            style: 'cancel',
            text: 'cancel'
          },
          {
            onPress: token => {
              if (token) {
                resolve(token)
              }
            },
            text: 'login'
          }
        ],
        'secure-text'
      )
    )
  }
}
