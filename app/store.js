import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

const middleware = applyMiddleware(...[thunk])

const enhancer = compose(middleware)

export default createStore(reducers, enhancer)
