import reducer from './Reducers/index'
import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

let middlewares = applyMiddleware(thunk)

export const store = createStore(reducer, middlewares)
