import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from './reducers'

const middleware = applyMiddleware(...[thunk, __DEV__ && logger])

const enhancer = compose(middleware)

export default createStore(reducers, enhancer)
