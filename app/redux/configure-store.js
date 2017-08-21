import { compose, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from './reducers'

export default () => {
  const enhancer = compose(applyMiddleware(thunk, createLogger()))

  return createStore(reducers, enhancer)
}
