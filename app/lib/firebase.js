import firebase from 'react-native-firebase'

const messaging = firebase.messaging()

class Firebase {
  requestPermissions() {
    messaging.requestPermissions()
  }

  token() {
    return messaging.getToken()
  }

  notification() {
    return messaging.getInitialNotification()
  }

  badge(number) {
    messaging.setBadgeNumber(number)
  }

  clear(id = '*') {
    messaging.removeDeliveredNotification(id)
  }
}

export default new Firebase()
