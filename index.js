import React from 'react'
import { Provider } from 'react-redux'

import GitHub from './app/index'
import store from './app/store'

export default () => (
  <Provider store={store()}>
    <GitHub />
  </Provider>
)
