import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

class ArtistGig extends Component {

handleSubmit = e => {
    e.preventDefault()
    let likedGig = {
        userId: this.props.userId,
        gigId: this.props.gig.id
    }
    axios.post('http://localhost:3000/gigs', likedGig, {withCredentials: true})
    .then(resp => console.log(resp))
}




    render() {
        console.log(this.props.gig.id)
        return(
        <Card >
            <Card.Body>
                <Card.Title>{this.props.gig.displayName}</Card.Title>
                <Card.Text>
                {this.props.gig.venue.metroArea.displayName}, {this.props.gig.venue.metroArea.country.displayName}
                </Card.Text>
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>Save Gig</Button>
            </Card.Body>
        </Card>

        )
    }

}

export default ArtistGig