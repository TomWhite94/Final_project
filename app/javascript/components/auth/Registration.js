import React, { Component } from "react";


export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentDidMount() {
      fetch("http://localhost:3000/v1/login")
      .then(response => response.json())
      .then(resp => console.log(resp.login))
  }

  handleSubmit(event) {
    event.preventDefault();
    const loginDetails = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: this.state.email, 
            password: this.state.password,
        })
    }
    fetch("http://localhost:3000/v1/login", loginDetails)
      .then(response => response.json())
      .then(resp => console.log(resp))
      
    
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />


          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}