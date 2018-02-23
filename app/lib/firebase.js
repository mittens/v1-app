import firebase from 'react-native-firebase'

const messaging = firebase.messaging()

class Firebase {
  constructor() {
    messaging.requestPermissions()
  }

  token() {
    return messaging.getToken()
  }
}

export default new Firebase()
