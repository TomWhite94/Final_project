import React from "react"
import PropTypes from "prop-types"
import axios from 'axios'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Homepage from './Homepage'
import Registration from './auth/Registration'
import Taskbar from './Taskbar'
import Artist from './Artist'
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends React.Component {

  // USER LOG IN HANDLER

state = {
  isLoggedIn: false,
  user: {}
}
  
handleLogin = (data) => {
  this.setState({
    isLoggedIn: true,
    user: data.user
  })
  console.log(this.state)
}

handleLogout = () => {
  this.setState({
  isLoggedIn: false,
  user: {}
  })
}

componentDidMount = () => {
  this.loginStatus()
}

loginStatus = () => {
    axios.get('http://localhost:3000/logged_in', 
  {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
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
    <Taskbar loggedInStatus={this.state.isLoggedIn} user={this.state.user} />
    <Switch>
      
      <Route exact path="/login" render={(props) => <Registration {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />} />
      <Route exact path="/homepage" render={(props) => <Homepage {...props} loggedInStatus={this.state.isLoggedIn} />} />
      <Route path="/artist/:id" render={(props) => <Artist key={props.match.params.id} {...props} loggedInStatus={this.state.isLoggedIn} />}/>
    </Switch>
    </>
    </BrowserRouter>
    );
  }
}

export default App
