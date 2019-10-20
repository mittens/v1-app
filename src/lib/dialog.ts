import { Alert } from 'react-native'

class Dialog {
  alert(title: string, message: string) {
    Alert.alert(title, message, [
      {
        text: 'okay'
      }
    ])
  }

  confirm(title: string, message: string): Promise<boolean> {
    return new Promise(resolve =>
      Alert.alert(title, message, [
        {
          style: 'cancel',
          text: 'no'
        },
        {
          onPress: () => resolve(true),
          style: 'destructive',
          text: 'yes'
        }
      ])
    )
  }
}

export const dialog = new Dialog()
