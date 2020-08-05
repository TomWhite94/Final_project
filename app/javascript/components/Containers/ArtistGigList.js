import React, { Component } from 'react';
import ArtistGig from '../ArtistGig'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import { connect } from 'react-redux'


class ArtistGigList extends Component {



    state = {
        userLikedGigsId: [],
        userLikedGigs: []
    }

componentDidMount = () => {
  this.getData()
}

getData = () => {
    axios.get('http://localhost:3000/gigs', {withCredentials: true})
    .then(resp => this.setState({
        userLikedGigsId: resp.data.gigs.map(gig => gig.gigId),
        userLikedGigs: resp.data.gigs
    })
    )
}

likeGig = (gigId) => {
    let likedGig = {
        userId: this.props.userIdRedux,
        gigId: gigId
    }

    axios.post('http://localhost:3000/gigs', likedGig, {withCredentials: true})
    .then(resp => {
        this.setState({buttonDisabled: true})
        this.getData()
    }
    )

}

unlikeGig = (gigObjectId) => {
  
    axios.delete(`http://localhost:3000/gigs/${gigObjectId}`, {withCredentials: true})
    .then(resp => {
        this.setState({buttonDisabled: false})
        this.getData()
    }
    )
}


render() {
   return(

        <Row>
        {this.props.artistGigs.map((gig, index) => (
            <Col md="4" key={index}>
            <ArtistGig gig={gig} isLiked={this.state.userLikedGigsId.includes(gig.id)} likeGig={() => this.likeGig(gig.id)} unlikeGig={() => this.unlikeGig((this.state.userLikedGigs.filter(gigs => gigs.gigId == gig.id)[0].id))}/>
            </Col>
        ))}
        </Row>
   

   )
            


}
}

const mapStateToProps = state => {
    return {userIdRedux: state.userId}
} 

export default connect(mapStateToProps)(ArtistGigList)