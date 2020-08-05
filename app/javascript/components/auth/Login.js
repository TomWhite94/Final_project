import React, { Component } from "react";
import Registration from './Registration'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux'
import { setUserId } from '../actions'
import { setUsername } from '../actions'
import { fetchLogin } from '../actions'

class Login extends Component {
  
  state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: ""
    };



  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  handleSubmit = (event) => {
    event.preventDefault()
    const {email, password} = this.state
    let user = {
      email: email,
      password: password
    }
    
    axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response.data.user)
        this.props.fetchLogin()
        this.props.setUserId(response.data.user.id)
        this.props.setUsername(response.data.user.username)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };
redirect = () => {
    this.props.history.push('/homepage')
  }


handleErrors = () => {
  return (
    <div>
      <ul>{this.state.errors.map((error) => {
        return <p style={{color: "red"}} key={error}>{error}</p>
      })}
      </ul> 
    </div>
  )
}

handleLogin = (user) => {
  localStorage.setItem("username", user.username)
  localStorage.setItem("userId", user.id)
}


  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row className="mt-5">
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Button variant="primary" type="submit" >
                Login
              </Button>
              <div>
                {
                  this.state.errors ? this.handleErrors() : null
                }
              </div>
            </Col>
          </Row>
        </Form>

      </div>
    );
  }
}

export default connect(null, {setUserId: setUserId, setUsername: setUsername, fetchLogin: fetchLogin})(Login)