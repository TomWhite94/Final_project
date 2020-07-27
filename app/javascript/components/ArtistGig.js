import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

class ArtistGig extends Component {

    state = {
        buttonDisabled: false
    }

    handleLikeGig = () => {
        this.props.likeGig()
        this.setState({
            buttonDisabled: true
        })

    }

    handleUnlikeGig = () => {
        this.props.unlikeGig()
        this.setState({
            buttonDisabled: false
        })
    }

render() {
        return(
        <Card >
            <Card.Body>
                <Card.Title>{this.props.gig.displayName}</Card.Title>
                <Card.Text>
                {this.props.gig.venue.metroArea.displayName}, {this.props.gig.venue.metroArea.country.displayName}
                </Card.Text>
                <Card.Text>
                    {this.props.gig.start.date}
                </Card.Text>
                {this.props.isLiked ? <Button  variant="danger" onClick={this.handleUnlikeGig}>Remove Gig</Button> : <Button variant="primary" onClick={this.handleLikeGig}>Save Gig</Button>}
            </Card.Body>
        </Card>

        )
    }

}

export default ArtistGig