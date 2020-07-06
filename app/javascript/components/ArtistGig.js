import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class ArtistGig extends Component {





    render() {
        
        return(
        <Card>
            <Card.Body>
                <Card.Title>{this.props.gig.displayName}</Card.Title>
                <Card.Text>
                {this.props.gig.venue.metroArea.displayName}, {this.props.gig.venue.metroArea.country.displayName}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>

        )
    }

}

export default ArtistGig