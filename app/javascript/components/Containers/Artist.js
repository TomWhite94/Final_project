import React, { Component } from 'react';
import ArtistGigList from './ArtistGigList'
import { withRouter } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Artist extends Component {

    state = {
        isLoading: true,
        artistName: [],
        artistSrc: [],
        artistTour: [],
        artistGigsUrl: "",
        artistGigs: []
        
    }

    // fetch(this.state.artistGigsUrl + "?apikey=XyKG4KDNOliuaDev")
    // .then(resp => resp.json())
    // .then(data => this.setState({
    //     artistGigs: data.resultsPage.results.event
    //     }))


fetchArtist = () => {
    let artistUrl = `https://api.songkick.com/api/3.0/artists/${this.props.match.params.id}.json?apikey=XyKG4KDNOliuaDev`
    fetch(artistUrl)
    .then(response => response.json())
    .then(data => {

        fetch(data.resultsPage.results.artist.identifier[0].eventsHref + "?apikey=XyKG4KDNOliuaDev")
        .then(resp => resp.json())
        .then(data => this.setState({
            artistGigs: data.resultsPage.results.event
            }))

        this.setState({
        artistName: data.resultsPage.results.artist.displayName,
        isLoading: false,
        artistSrc: `//images.sk-static.com/images/media/profile_images/artists/${this.props.match.params.id}/huge_avatar`,
        artistTour: data.resultsPage.results.artist.onTourUntil,
        artistGigsUrl: data.resultsPage.results.artist.identifier[0].eventsHref
        })}
    )
}

componentDidMount = () => {
    this.fetchArtist()
}

artistTourInformation = () => {
    
        if (this.state.artistTour != null){
            return <p>On tour until {this.state.artistTour}</p>
        } else {
            return <p>Not currently on tour</p>
        }
}

artistGigInformation = () => {
   

    if (this.state.artistGigs.length > 1){
        return <p>{this.state.artistGigs.length} upcoming gigs</p>
    } else if (this.state.artistGigs.length == 1){
        return <p>{this.state.artistGigs.length} upcoming gig</p>
    } else {
        return <p>No upcoming gigs</p>
    }

}

render() {
    if (this.state.isLoading == false) {
        return(
            <Container fluid>
            <Row className="bg-secondary">
                <Col xs={12} md={{span: 7, offset: 1}}
                 style={{
                    color: "white"
                }}>
                  
                    <h1>
                    {this.state.artistName}
                    </h1>
                   
                    <div>
                     {this.artistTourInformation()}  
                     {this.artistGigInformation()} 
                    </div>
                </Col>
                
                <Col xs={12} md={4}>
                <Image alt="Band live." width="300" height="300" className="band-image" src={this.state.artistSrc} roundedCircle />
                </Col>
                </Row>
            <Row>
                <Col>
                    <ArtistGigList artistGigs={this.state.artistGigs} userId={this.props.userId} />
                </Col>
        
            </Row>
            </Container>
        )
    } else {
        return  <Spinner animation="border" role="status">
                   <span className="sr-only">Loading...</span>
                </Spinner>
    }
   
    
}


}

export default withRouter(Artist)