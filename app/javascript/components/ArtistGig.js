import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

class ArtistGig extends Component {

    state = {
        buttonDisabled: false
    }

handleSubmit = e => {
    e.preventDefault()
    let likedGig = {
        userId: this.props.userId,
        gigId: this.props.gig.id
    }

    axios.post('http://localhost:3000/gigs', likedGig, {withCredentials: true})
    .then(resp => this.setState({buttonDisabled: true}))
}

componentDidMount = () => {
    if (this.props.likedGig) {
        this.setState({
            buttonDisabled: true
        })
    }
}

render() {
    // let eventDate = new Date(this.props.gig.start.date)
    // console.log(eventDate)
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
                <Button variant="primary" type="submit" onClick={this.handleSubmit} disabled={this.state.buttonDisabled}>Save Gig</Button>
            </Card.Body>
        </Card>

        )
    }

}

export default ArtistGig