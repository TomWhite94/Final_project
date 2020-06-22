import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'


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
            

render() {
    console.log(this.state.artistSearchResult)
    return(
        
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                </Nav>
    
                <AsyncTypeahead
                        id="basic-typeahead-example"
                        isLoading={this.state.isSearching}
                        labelKey="displayName"
                        onSearch={this.handleSearch}
                        options={this.state.artistSearchResult}
                        placeholder="Artist Search"
                        // selected={selected}
                    />
                
            </Navbar.Collapse>
        </Navbar>
   
    
            
       
        
        
    )
}


}


export default Taskbar