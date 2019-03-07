import { AlertIOS } from 'react-native'

export default class Dialog {
  static alert(message) {
    AlertIOS.alert(null, message, [
      {
        text: 'okay'
      }
    ])
  }

  static confirm(message) {
    return new Promise(resolve =>
      AlertIOS.alert(null, message, [
        {
          style: 'cancel',
          text: 'no'
        },
        {
          onPress: () => resolve(),
          text: 'yes'
        }
      ])
    )
  }
}
