import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class ArtistGig extends Component {

handleSubmit = () => {

}



    render() {
        console.log(this.props.userId)
        return(
        <Card>
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