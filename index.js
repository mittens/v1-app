import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'

import App from './app/index'
import store from './app/store'
import { sentry } from './app/lib'

sentry()

class GitHub extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('GitHub', () => GitHub)
