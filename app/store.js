import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

const middleware = applyMiddleware(
  ...[thunk, createReactNavigationReduxMiddleware('root', state => state.nav)]
)

export default () => {
  const enhancer = compose(middleware)

  return createStore(reducers, enhancer)
}
