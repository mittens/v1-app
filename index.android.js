import React from 'react'
import { AppRegistry } from 'react-native'

import { Provider } from 'react-redux'
import configureStore from './app/redux/configure-store'

import App from './app/index'

const store = configureStore()

const GitHub = () =>
  <Provider store={store}>
    <App />
  </Provider>

AppRegistry.registerComponent('GitHub', () => GitHub)
