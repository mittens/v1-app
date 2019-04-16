import { Alert } from 'react-native'

export default class Dialog {
  static alert(message) {
    Alert.alert(null, message, [
      {
        text: 'Okay'
      }
    ])
  }

  static confirm(message) {
    return new Promise(resolve =>
      Alert.alert(null, message, [
        {
          onPress: () => resolve(false),
          style: 'cancel',
          text: 'No'
        },
        {
          onPress: () => resolve(true),
          text: 'Yes'
        }
      ])
    )
  }
}
