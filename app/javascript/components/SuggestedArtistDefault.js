import React, { Component } from 'react'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import Jumbotron from 'react-bootstrap/Jumbotron'

class SuggestedArtistDefault extends Component {

    state = {
        suggestedArtists: []
    }

    componentDidMount() {
        axios.get(`https://api.songkick.com/api/3.0/artists/264535/similar_artists.json?apikey=XyKG4KDNOliuaDev`)
        .then(resp => {
            let chunkSize = 4
            let index = 0
            let outputArray = []
            while (index < resp.data.resultsPage.results.artist.length) {
                outputArray.push(resp.data.resultsPage.results.artist.slice(index, index + chunkSize))
                index += chunkSize
            }
            this.setState({
                suggestedArtists: outputArray
            })
        })
        
    }


    renderCarousel = () => (
        
        this.state.suggestedArtists.map((array, key) => (
            <Carousel.Item key={key} height="300"> 
                <Row>
                    {array.map((performer, key) => (
                        <Col xs={3} key={performer.id}>
                            <img
                                className="d-flex w-100 band-image"
                                width="300" height="300"
                                src={`//images.sk-static.com/images/media/profile_images/artists/${performer.id}/huge_avatar`}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3 className="carousel-artist">{performer.displayName}</h3>
                            </Carousel.Caption>
                        </Col>
                    ))}
                </Row>
            </Carousel.Item>
        ))
    )
        
    

render() {
    
    return (
        <Jumbotron className="bg-secondary" style={{
            color: "white"
        }} fluid>
            <h1 className="text-indent">Suggested Artists</h1>
            <Carousel className="carousel">
                {this.renderCarousel()}
                
            </Carousel>
        </Jumbotron>
    )
}


}

export default SuggestedArtistDefault
