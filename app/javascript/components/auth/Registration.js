import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class Registration extends Component {
  
  state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      passwordMatch: true
    };



  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // componentDidMount() {
  //     fetch("http://localhost:3000/users")
  //     .then(response => response.json())
  //     .then(resp => console.log(resp.login))
  // }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.password == this.state.passwordConfirmation) {
      this.setState({passwordMatch: true })
      let body = JSON.stringify({
        username: this.state.username,
        email: this.state.email, 
        password: this.state.password,
        // password_confirmation: this.state.passwordConfirmation
      })
    console.log(body)
      const loginDetails = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: body
      }
      fetch("http://localhost:3000/users", loginDetails)
        .then(response => response.json())
        .then(resp => console.log(resp))
    } else {
      this.setState({
        passwordMatch: false,
        password: "",
        passwordConfirmation: ""
      })
    }
}

errorToggle = () => {
  if (this.state.passwordMatch == false) {
    return <p style={{color: "red"}}>Passwords do not match</p>
  }
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
              <Form.Group controlId="formBasicPasswordConfirmation">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Button variant="primary" type="submit" >
                Submit
              </Button>
              <div>
              {this.errorToggle()}
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}