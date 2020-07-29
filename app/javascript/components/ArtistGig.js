import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import { connect } from 'react-redux'

class ArtistGig extends Component {

    state = {
        buttonDisabled: false,
        visibility: "hidden"
    }

    renderAlert = () => {
        
    }
    

    handleLikeGig = () => {
        if (this.props.userIdRedux != '') {
        this.props.likeGig()
        this.setState({
            buttonDisabled: true
        })

        } else {
            this.setState({
                visibility: "visible"
            })
        }
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
                <Row>
                <Col md="auto">
                {this.props.isLiked ? <Button  variant="danger" onClick={this.handleUnlikeGig}>Remove Gig</Button> : <Button variant="primary" onClick={this.handleLikeGig}>Save Gig</Button>}
                </Col>
                <Col md="auto">
                <Alert className={this.state.visibility} variant="danger">
                    Log in to like gigs!
                </Alert>
                </Col>
                </Row>
            </Card.Body>
        </Card>

        )
    }

}

const mapStateToProps = state => {
    return {userIdRedux: state.userId}
} 

export default connect(mapStateToProps)(ArtistGig)