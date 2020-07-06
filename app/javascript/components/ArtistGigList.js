import React, { Component } from 'react';
import ArtistGig from './ArtistGig'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class ArtistGigList extends Component {




render() {
   return(

        <Row>
        {this.props.artistGigs.map((gig, index) => (
            <Col md="4" key={index}>
            <ArtistGig gig={gig} />
            </Col>
        ))}
        </Row>
   

   )
            


}
}

export default ArtistGigList