import React, { Component } from 'react';
import { connect } from 'react-redux'
import ArtistGigCard from './ArtistGigCard'

class ArtistGig extends Component {

    state = {
        buttonDisabled: false,
        visibility: "hidden"
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
            <ArtistGigCard gig={this.props.gig} isLiked={this.props.isLiked} handleUnlikeGig={this.handleUnlikeGig} handleLikeGig={this.handleLikeGig} visibility={this.state.visibility}/>
        )
}

}

const mapStateToProps = state => {
    return {userIdRedux: state.userId}
} 

export default connect(mapStateToProps)(ArtistGig)