import React, { Component } from "react";
import Login from './Login'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

export default class Registration extends Component {
  
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
  const {username, email, password, password_confirmation} = this.state
  let user = {
    username: username,
    email: email,
    password: password,
    password_confirmation: password_confirmation,
    liked_gigs: []
  }
axios.post('http://localhost:3000/users', {user}, {withCredentials: true})
  .then(response => {
    if (response.data.status === 'created') {
      this.props.handleLogin(response.data.user.username)
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
          <Row className="mt-5">
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleChange} />
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
              <Form.Group controlId="formBasicPasswordConfirmation">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Button variant="primary" type="submit" >
                Register
              </Button>
              <div>
                {
                  this.state.errors ? this.handleErrors() : null
                }
              </div>
              <div>
              <Nav.Link href="/login">Already have an account? Click here to log in</Nav.Link>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}