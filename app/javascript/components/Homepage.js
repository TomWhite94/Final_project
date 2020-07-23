import React, { Component } from 'react'
import GigDetails from './GigDetails'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Homepage extends Component {

   state = {
            userlikedGigsId: [],
            likedGigs: {},
            selectedDate: ""
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
       
        // console.log(moment(date.date).format('YYYY-MM-DD'))
        if (moment(date.date).format('YYYY-MM-DD') in this.state.likedGigs)  {
            return "date-fill"
        }
    }

    setOnClickDay = (date, event) => {
        this.setState({
            selectedDate: moment(date).format('YYYY-MM-DD')
        })
    }
      
render() {
    
    return(
        <div>
        <h1>Homepage</h1>
        <>
        {this.state.userlikedGigsId}
        </>
        <Row className="mt-5 d-flex justify-content-center">
        <Col md={{ span: 6, offset: 3 }}>
        <Calendar minDetail="month" maxDetail="month" tileClassName={this.setTileClassName} onClickDay={this.setOnClickDay}/>
        </Col>
        </Row>
        <div>
            {this.state.selectedDate in this.state.likedGigs ? this.state.likedGigs[this.state.selectedDate].map((gig, key) => {
                return <div key={key}><GigDetails gig={gig} /></div>
                           
            }) :"No gigs on this day"}
        </div>
        </div>
        )
}


}




export default Homepage
