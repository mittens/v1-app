import { SENTRY_DSN } from 'react-native-dotenv'

import { Sentry } from 'react-native-sentry'

export default () => {
  if (!__DEV__) {
    Sentry.config(SENTRY_DSN).install()
  }
}
