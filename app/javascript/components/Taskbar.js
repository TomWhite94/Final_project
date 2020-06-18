import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

let ARTIST_SEARCH = "https://api.songkick.com/api/3.0/search/artists.json?apikey=XyKG4KDNOliuaDev&query="

class Taskbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artist_search_result: [],
            artist_search: "",
            numOfPages: 0,
            page: 0
        }
        this.handleChange = this.handleChange.bind(this)
        
    }

   

    handleChange(event){
       
        
        
        fetch(ARTIST_SEARCH + event.target.value)
            .then(response => response.json())
            .then(data => {
                if (data.resultsPage.status == "ok" && data.resultsPage.results.hasOwnProperty("artist")) {
                    this.setState({
                        artist_search_result: data.resultsPage.results.artist, 
                        page: data.resultsPage.page, 
                        numOfPages: Math.ceil(parseInt(data.resultsPage.totalEntries) / parseInt(data.resultsPage.perPage)),
                        // artist_search: event.target.value
                    })
                } else {
                    this.setState({
                        artist_search_result: []
                    })
                }

            })
        }
            

render() {
    console.log(this.state.artist_search_result)
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
    <Form inline>
      <FormControl type="text" name="artist_search" placeholder="Artist Search" className="mr-sm-2" onChange={this.handleChange}/>

      <ul>
        {this.state.artist_search_result.map((resp, id) => (
            
            <li key={id}>{resp.displayName}</li>
            
        ))}
            </ul>
    </Form>
  </Navbar.Collapse>
</Navbar>
   
    
            
       
        
        
    )
}


}


export default Taskbar