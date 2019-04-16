import { SENTRY_DSN } from 'react-native-dotenv'

import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Sentry } from 'react-native-sentry'
import codePush from 'react-native-code-push'

import App from './src/index'
import { persistor, store } from './src/store'

Sentry.config(SENTRY_DSN).install()

class Mittens extends Component {
  async componentDidMount() {
    const update = await codePush.getUpdateMetadata()

    if (update) {
      const { appVersion, label } = update

      Sentry.setVersion(appVersion + '-codepush:' + label)
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Mittens', () => Mittens)
