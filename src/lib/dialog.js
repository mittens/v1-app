import { Alert } from 'react-native'

export default class Dialog {
  static alert(message) {
    Alert.alert(null, message, [
      {
        text: 'okay'
      }
    ])
  }

  static confirm(message) {
    return new Promise(resolve =>
      Alert.alert(null, message, [
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
