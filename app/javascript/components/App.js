import React from "react"
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Homepage from './Containers/Homepage'
import Taskbar from './Taskbar'
import Artist from './Containers/Artist'
import LoginContainer from './auth/Containers/LoginContainer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'
import { fetchLogin } from './actions'

class App extends React.Component {
  
componentDidMount = () => {
  this.props.fetchLogin()
}

render () {
  
    return (
      
    
    <BrowserRouter>
    <>
    <Taskbar />
    <Switch>
      
      <Route exact path="/login" render={(props) => <LoginContainer {...props} />} />
      <Route exact path="/homepage" render={(props) => <Homepage {...props} />} />
      <Route path="/artist/:id" render={(props) => <Artist {...props} key={props.match.params.id} />}/>
    </Switch>
    </>
    </BrowserRouter>
   
    );
  }
}



export default connect(null, {fetchLogin: fetchLogin})(App)
