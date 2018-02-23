import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

const middleware = applyMiddleware(
  ...[thunk, createReactNavigationReduxMiddleware('root', state => state.nav)]
)

const enhancer = compose(middleware)

export default createStore(reducers, enhancer)
