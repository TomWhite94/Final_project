import React, { Component } from 'react'
import Taskbar from './Taskbar'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
let SONGKICK_URL = 'https://api.songkick.com/api/3.0/artists/379603/gigography.json?apikey=XyKG4KDNOliuaDev'

let SIMILAR_URL = 'https://api.songkick.com/api/3.0/artists/264535/similar_artists.json?apikey=XyKG4KDNOliuaDev'


class Homepage extends Component {

   state = {
            userlikedGigsId: [],
            likedGigs: {}
        }
   
    componentDidMount() {
        axios.get('http://localhost:3000/gigs', {withCredentials: true})
        .then(resp => {resp.data.gigs.map(gig => this.fetchGigDetails(gig.gigId))
        
            this.setState({
            userlikedGigsId: resp.data.gigs.map(gig => gig.gigId)
        })}
        )
    }

    fetchGigDetails = (gigId) => {
    axios.get(`https://api.songkick.com/api/3.0/events/${gigId}.json?apikey=XyKG4KDNOliuaDev`)
    .then(resp => this.setState(prevState => {
        let newState = prevState
        let gigResult = resp.data.resultsPage.results.event
         if (gigResult.start.date in newState.likedGigs) {
            newState.likedGigs[gigResult.start.date].push(gigResult)
         } else {
            newState.likedGigs[gigResult.start.date] = [gigResult]
         }
            return newState
    }))
    }

    setTileClassName = (date, view) => {
        console.log(date)
        return "date-fill"
    }
      
render() {
    
    return(
        <div>
        <h1>Homepage</h1>
        <>
        {this.state.userlikedGigsId}
        </>
        <Calendar minDetail="month" maxDetail="month" tileClassName={this.setTileClassName}/>
        </div>
        )
}


}




export default Homepage
