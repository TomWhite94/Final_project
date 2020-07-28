import React from "react"
import axios from 'axios'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Homepage from './Containers/Homepage'
import Taskbar from './Taskbar'
import Artist from './Containers/Artist'
import LoginContainer from './auth/Containers/LoginContainer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'
import { setUserId } from './actions'

class App extends React.Component {

state = {
  isLoggedIn: !!localStorage.getItem("username"),
  user: localStorage.getItem("username"),
  userId: localStorage.getItem("userId"),

}


  
handleLogin = (user) => {
  this.setState({
    isLoggedIn: true,
    user: user.username
  })
  this.props.setUserId(user.id)
  localStorage.setItem("username", user.username)
  localStorage.setItem("userId", user.id)
}

handleLogout = () => {
  this.setState({
  isLoggedIn: false,
  user: ""
  })
  this.props.setUserId('')
  localStorage.removeItem("username")
  localStorage.removeItem("userId")
}

componentDidMount = () => {
  if (!this.state.isLoggedIn) {
  this.loginStatus()
  }
}

loginStatus = () => {
    axios.get('http://localhost:3000/logged_in', 
  {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response.data.user)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
}

render () {
  
    return (
      
    
    <BrowserRouter>
    <>
    <Taskbar loggedInStatus={this.state.isLoggedIn} user={this.state.user} handleLogout={this.handleLogout}/>
    <Switch>
      
      <Route exact path="/login" render={(props) => <LoginContainer {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />} />
      <Route exact path="/homepage" render={(props) => <Homepage {...props} loggedInStatus={this.state.isLoggedIn} />} />
      <Route path="/artist/:id" render={(props) => <Artist {...props} key={props.match.params.id} loggedInStatus={this.state.isLoggedIn} />}/>
    </Switch>
    </>
    </BrowserRouter>
   
    );
  }
}

export default connect(null, {setUserId: setUserId})(App)
