import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { withRouter } from 'react-router-dom'


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
                        // page: data.resultsPage.page, 
                        // numOfPages: Math.ceil(parseInt(data.resultsPage.totalEntries) / parseInt(data.resultsPage.perPage)),
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

    usernameBar = () => {
        if (this.props.loggedInStatus == true) {
            return  <Nav.Link style={{color: "white"}} href="/Homepage">{this.props.user.username}</Nav.Link>
        } else {
            return  <Nav.Link style={{color: "white"}} href="/Login">Login</Nav.Link>
        }
    }
            

render() {
    // console.log(this.state.artistSearchResult)
    
    return(
        
        <Navbar  bg="dark" expand="lg">
            <Navbar.Brand style={{color: "white"}} href="#home">Gig Planner</Navbar.Brand>
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


export default withRouter(Taskbar)