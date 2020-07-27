import { createStore } from 'redux'
import gigApp from './reducers'

export const store = createStore(gigApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

