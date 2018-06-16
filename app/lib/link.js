import { Linking } from 'react-native'
import Rate, { AndroidMarket } from 'react-native-rate'

export default {
  get(notification) {
    const { subject } = notification
    const { url, type } = subject

    switch (type) {
      case 'Issue':
        return url.replace('api.', '').replace('/repos', '')

      case 'PullRequest':
        return url
          .replace('api.', '')
          .replace('/repos', '')
          .replace('/pulls', '/pull')
    }
  },

  open(notification) {
    const uri = this.get(notification)

    Linking.openURL(uri)
  },

  go(uri) {
    if (uri === 'rate-mittens') {
      return Rate.rate(
        {
          AppleAppID: '1352807491',
          GooglePackageName: 'com.designplox.github',
          preferInApp: true
        },
        () => {}
      )
    }

    Linking.openURL(uri)
  }
}
