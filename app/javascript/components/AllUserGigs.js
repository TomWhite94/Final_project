import React, { Component } from 'react'
import axios from 'axios'



class AllUserGigs extends Component {

    state = {
        gigNames: []
    }

    componentDidMount() {
        this.fetchGigs()
    }

    fetchGigs = () => {
        this.props.allLikedUserGigsId.map(gigId => {
            fetch(`https://api.songkick.com/api/3.0/events/${gigId}.json?apikey=XyKG4KDNOliuaDev`)
            .then(resp => resp.json())
            .then(data => this.setState(prevState => {
                console.log(prevState)
                let newGigNames = prevState.gigNames
                newGigNames.push(data.resultsPage.results.event.displayName)
                return {
                
                gigNames: newGigNames
            }})
        )})
      
    }

    renderGigs = () => {
        if (this.state.gigNames.length == this.props.allLikedUserGigsId.length) {
           return this.state.gigNames.map((name, key) => {
           return <li key={key}>{name}</li>
            })
        }
    }


render() {
console.log(this.state.gigNames)
    return(
        <div>
        <ul>
       {this.renderGigs()}
        </ul>
        </div>
    )
}






}

export default AllUserGigs