import { createStore, applyMiddleware, compose } from 'redux'
import gigApp from './reducers'
import thunk from 'redux-thunk'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export const store = createStore(gigApp, composeEnhancer(applyMiddleware(thunk) ) )

