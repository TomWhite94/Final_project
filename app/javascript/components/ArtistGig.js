import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

class ArtistGig extends Component {

handleSubmit = e => {
    e.preventDefault()
    let respObject = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userId: this.props.userId,
            gigId: this.props.gig.id
         })
    }
    fetch('http://localhost:3000/gigs', respObject)
    .then(resp => resp.json())
    .then(data => console.log(data))
}




    render() {
        console.log(this.props.gig.id)
        return(
        <Card onSubmit={this.handleSubmit}>
            <Card.Body>
                <Card.Title>{this.props.gig.displayName}</Card.Title>
                <Card.Text>
                {this.props.gig.venue.metroArea.displayName}, {this.props.gig.venue.metroArea.country.displayName}
                </Card.Text>
                <Button variant="primary">Save Gig</Button>
            </Card.Body>
        </Card>

        )
    }

}

export default ArtistGig