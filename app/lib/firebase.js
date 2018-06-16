import firebase from 'react-native-firebase'

const messaging = firebase.messaging()
const notifications = firebase.notifications()

class Firebase {
  requestPermissions() {
    messaging.requestPermission()
  }

  token() {
    return messaging.getToken()
  }

  notification() {
    return notifications.getInitialNotification()
  }

  badge(number) {
    if (this.badgeEnabled) {
      notifications.setBadge(number)
    } else {
      notifications.setBadge(0)
    }
  }

  clear() {
    notifications.removeAllDeliveredNotifications()
  }

  enableBadge(enabled) {
    this.badgeEnabled = Boolean(enabled)
  }
}

export default new Firebase()
