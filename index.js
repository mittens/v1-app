import 'react-native-gesture-handler'

import { SENTRY_DSN } from 'react-native-dotenv'

import * as Sentry from '@sentry/react-native'
import { AppRegistry } from 'react-native'

import { Mittens } from './src'

Sentry.init({
  dsn: SENTRY_DSN,
  environment: __DEV__ ? 'development' : 'production'
})

AppRegistry.registerComponent('Mittens', () => Mittens)
