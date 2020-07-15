import React from "react"
import PropTypes from "prop-types"
import axios from 'axios'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Homepage from './Homepage'
import Registration from './auth/Registration'
import Taskbar from './Taskbar'
import Artist from './Artist'
import Login from './auth/Login'
import LoginContainer from './auth/LoginContainer'
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends React.Component {

state = {
  isLoggedIn: !!localStorage.getItem("username"),
  user: localStorage.getItem("username"),
  userId: "",
  likedGigs: []
}


  
handleLogin = (user) => {
  this.setState({
    isLoggedIn: true,
    user: user.username,
    userId: user.id,
    likedGigs: user.liked_gigs
  })
  localStorage.setItem("username", user)
}

handleLogout = () => {
  this.setState({
  isLoggedIn: false,
  user: "",
  userId: "",
  likedGigs: []
  })
  localStorage.removeItem("username")
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
  console.log(this.state)
    return (
      
      
    <BrowserRouter>
    <>
    <Taskbar loggedInStatus={this.state.isLoggedIn} user={this.state.user} handleLogout={this.handleLogout}/>
    <Switch>
      
      {/* <Route exact path="/register" render={(props) => <Registration {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />} /> */}
      <Route exact path="/login" render={(props) => <LoginContainer {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />} />
      <Route exact path="/homepage" render={(props) => <Homepage {...props} loggedInStatus={this.state.isLoggedIn} />} />
      <Route path="/artist/:id" render={(props) => <Artist key={props.match.params.id} {...props} loggedInStatus={this.state.isLoggedIn} userId={this.state.userId} likedGigs={this.state.likedGigs} />}/>
    </Switch>
    </>
    </BrowserRouter>
    );
  }
}

export default App
