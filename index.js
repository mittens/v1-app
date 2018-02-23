import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'

import App from './app/index'
import store from './app/store'

const GitHub = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('GitHub', () => GitHub)
