import React from "react"
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'

class Index extends React.Component {

render(){
    return(
        <Provider store={store}>
        <div>
            <App />
        </div>
        </Provider>
    )
}



}

export default Index