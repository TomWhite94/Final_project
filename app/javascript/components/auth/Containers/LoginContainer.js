import React, { Component } from 'react'
import Login from '../Login'
import Registration from '../Registration'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class LoginContainer extends Component {

    state = {
        showLogin: true,
    }

    toggleLogin = () => {
        this.setState(prevState => (
            {showLogin: !prevState.showLogin}
        ))
    }

    handleToggle = () => {
        if (this.state.showLogin) {
            return <div>
                        <Login {...this.props} />
                    </div> 
        }
        if (!this.state.showLogin) {
            return <div>
                        <Registration {...this.props} />
                    </div>
        }
    }
  
    render() {
        return(
            <div>
                {this.handleToggle()}
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Button variant="link" onClick={this.toggleLogin}>{this.state.showLogin ? "Don't have an account? Click here to register":"Already have an account? Click here to log in"}</Button>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default LoginContainer