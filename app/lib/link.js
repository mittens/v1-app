import { Linking } from 'react-native'

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
    const url = this.get(notification)

    Linking.openURL(url)
  }
}
