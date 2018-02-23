import firebase from 'react-native-firebase'

const messaging = firebase.messaging()

class Firebase {
  requestPermissions() {
    messaging.requestPermissions()
  }

  token() {
    return messaging.getToken()
  }
}

export default new Firebase()
