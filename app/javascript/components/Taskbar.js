import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchLogin } from './actions'
import { setUserId } from './actions'
import { setUsername } from './actions'



let ARTIST_SEARCH = "https://api.songkick.com/api/3.0/search/artists.json?apikey=XyKG4KDNOliuaDev&per_page=5&page=1&query="

class Taskbar extends Component {

    state = {
            artistSearchResult: [],
            isSearching: false
    }

    handleSearch = query => { 
        this.setState({isSearching: true})
        fetch(ARTIST_SEARCH + query)
            .then(response => response.json())
            .then(data => {
                if (data.resultsPage.status == "ok" && data.resultsPage.results.hasOwnProperty("artist")) {
                    this.setState({
                        artistSearchResult: data.resultsPage.results.artist, 
                        isSearching: false,
                        
                    })
                } else {
                    this.setState({
                        artistSearchResult: [],
                        isSearching: false
                    })
                }

            })
    }

    logoutButton = () => {
        axios.delete('http://localhost:3000/logout', {withCredentials: true})
        .then(response => {
        this.props.fetchLogin()
        this.handleLogout()
        this.props.history.push('/Login')
    })
    .catch(error => console.log(error))
  }

    usernameBar = () => {
        if (this.props.loggedInStatus == true) {
            return  <>
                    <Nav.Link style={{color: "white"}} href="/Homepage">{this.props.usernameRedux}</Nav.Link>
                    <Button variant="light" onClick={this.logoutButton}>Logout</Button>
                    </>
        } else {
            return  <Nav.Link style={{color: "white"}} href="/Login">Login</Nav.Link>
        }
    }

    handleLogout = () => {
        this.props.setUserId('')
        this.props.setUsername('')
        localStorage.removeItem("username")
        localStorage.removeItem("userId")
      }

 

render() {
    
    return(
        
        <Navbar  bg="dark" expand="lg">
            <Navbar.Brand style={{color: "white"}} href="/Homepage">GIG PLANNER</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {this.usernameBar()}
                </Nav>
    
                <AsyncTypeahead
                        id="basic-typeahead-example"
                        multiple={false}
                        isLoading={this.state.isSearching}
                        labelKey="displayName"
                        onSearch={this.handleSearch}
                        options={this.state.artistSearchResult}
                        placeholder="Artist Search"
                        onChange={(selected) => {
                            selected.length && this.props.history.push(`/artist/${selected[0].id}`)
                        }}
                    />
                
            </Navbar.Collapse>
        </Navbar>
   
    
            
       
        
        
    )
}


}

const mapStateToProps = state => {
    return {usernameRedux: state.username, loggedInStatus: state.loginStatus}
}


export default connect(mapStateToProps, {fetchLogin: fetchLogin, setUserId: setUserId, setUsername: setUsername})(withRouter(Taskbar))