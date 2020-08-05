import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Carousel from 'react-bootstrap/Carousel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { withRouter } from 'react-router-dom'

const GigDetails = props => {


    const renderCarousel = () => {
        let chunkSize = 4
        let index = 0
        let outputArray = []
            while (index < props.gig.performance.length) {
                outputArray.push(props.gig.performance.slice(index, index + chunkSize))
                index += chunkSize
            }
        return outputArray.map((array, key) => (
            <Carousel.Item key={key} height="150">
                <Row>
                {array.map((performer, key) => (
                    <Col xs={3} key={performer.artist.id}>
                        <img
                            className="d-flex w-100 band-image"
                            width="150" height="300"
                            src={`//images.sk-static.com/images/media/profile_images/artists/${performer.artist.id}/huge_avatar`}
                            alt="First slide"
                            onClick={() => props.history.push(`Artist/${performer.artist.id}`)}
                        />
                        <Carousel.Caption>
                            <h3 className="carousel-artist">{performer.artist.displayName}</h3>
                        </Carousel.Caption>
                    </Col>
                ))}
                </Row>
            </Carousel.Item>
        ))
    }


        return(
            <Jumbotron className="bg-secondary" style={{
                color: "white"
            }} fluid>
           <h1 className="text-indent">{props.gig.displayName}</h1>
           <h2 className="text-indent">City: {props.gig.venue.city.displayName}, {props.gig.venue.city.country.displayName}</h2>
           <h2 className="text-indent">Venue: {props.gig.venue.displayName}</h2>
           <Carousel className="carousel">
                {renderCarousel()}
                
            </Carousel>
           
           </Jumbotron>
        )

}

export default withRouter(GigDetails)