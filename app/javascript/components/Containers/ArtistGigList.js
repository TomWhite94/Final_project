import React, { Component } from 'react';
import ArtistGig from '../ArtistGig'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'


class ArtistGigList extends Component {

    state = {
        userLikedGigs: []
    }

componentDidMount = () => {
    axios.get('http://localhost:3000/gigs', {withCredentials: true})
    .then(resp => this.setState({
        userLikedGigs: resp.data.gigs.map(gig => gig.gigId)
    })
    )
}


render() {
   return(

        <Row>
        {this.props.artistGigs.map((gig, index) => (
            <Col md="4" key={index}>
            <ArtistGig gig={gig} userId={this.props.userId} likedGig={this.state.userLikedGigs.includes(gig.id)} />
            </Col>
        ))}
        </Row>
   

   )
            


}
}

export default ArtistGigList