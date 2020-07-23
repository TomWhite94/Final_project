import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Carousel from 'react-bootstrap/Carousel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { withRouter } from 'react-router-dom'

class AllGigs extends Component {


    renderCarousel = () => {
        let chunkSize = 4
        let index = 0
        let outputArray = []
        while (index < this.props.gig.performance.length) {
            outputArray.push(this.props.gig.performance.slice(index, index + chunkSize))
            index += chunkSize
        }
        console.log(outputArray)
        return outputArray.map((array, key) => (
            <Carousel.Item key={key} height="150"><Row>
            {array.map((performer, key) => (
             <Col xs={3} key={performer.artist.id}><img
            className="d-flex w-100 band-image"
            width="150" height="300"
            src={`//images.sk-static.com/images/media/profile_images/artists/${performer.artist.id}/huge_avatar`}
            alt="First slide"
            />
            <Carousel.Caption>
            <h3 className="carousel-artist">{performer.artist.displayName}</h3>
            </Carousel.Caption></Col>
            ))}
            </Row>
            </Carousel.Item>
           ))
    }

    render() {
        console.log(this.props.gig.performance)
        return(
            
            <Jumbotron className="bg-secondary" style={{
                color: "white"
            }}>
           <h1>{this.props.gig.displayName}</h1>
           <p>City: {this.props.gig.venue.city.displayName}, {this.props.gig.venue.city.country.displayName}</p>
           <p>Venue: {this.props.gig.venue.displayName}</p>
           <Carousel className="carousel">
                {this.renderCarousel()}
                
            </Carousel>
           
           </Jumbotron>
        )
    }

}

export default withRouter(AllGigs)