import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

const ArtistGigCard = ({gig, isLiked, handleUnlikeGig, handleLikeGig, visibility}) => (
    <Card >
            <Card.Body>
                <Card.Title>{gig.displayName}</Card.Title>
                <Card.Text>
                {gig.venue.metroArea.displayName}, {gig.venue.metroArea.country.displayName}
                </Card.Text>
                <Card.Text>
                    {gig.start.date}
                </Card.Text>
                <Row>
                <Col md="auto">
                {isLiked ? <Button  variant="danger" onClick={handleUnlikeGig}>Remove Gig</Button> : <Button variant="primary" onClick={handleLikeGig}>Save Gig</Button>}
                </Col>
                <Col md="auto">
                <Alert className={visibility} variant="danger">
                    Log in to like gigs!
                </Alert>
                </Col>
                </Row>
            </Card.Body>
        </Card>
)
export default ArtistGigCard