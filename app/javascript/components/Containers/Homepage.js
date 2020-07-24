import React, { Component } from 'react'
import GigDetails from '../GigDetails'
import SuggestedArtist from '../SuggestedArtist'
import SuggestedArtistDefault from '../SuggestedArtistDefault'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import Jumbotron from 'react-bootstrap/Jumbotron'

class Homepage extends Component {

   state = {
            userlikedGigsId: [],
            likedGigs: {},
            selectedDate: "",
            randomArtist: ""
        }
   
    componentDidMount() {
        axios.get('http://localhost:3000/gigs', {withCredentials: true})
        .then(resp => {resp.data.gigs.map(gig => this.fetchGigDetails(gig.gigId))
        
            this.setState({
            userlikedGigsId: resp.data.gigs.map(gig => gig.gigId)
        })
        }
        
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
       
        if (moment(date.date).format('YYYY-MM-DD') in this.state.likedGigs)  {
            return "date-fill"
        }
    }

    setOnClickDay = (date, event) => {
        this.setState({
            selectedDate: moment(date).format('YYYY-MM-DD')
        })
    }

    // renderRecommendedArtists = () => {
        
    //     if (this.state.userlikedGigsId.length > 0) {
    //         let randomItem = this.state.userlikedGigsId[Math.floor(Math.random()*this.state.userlikedGigsId.length)]
    //         axios.get(`https://api.songkick.com/api/3.0/events/${randomItem}.json?apikey=XyKG4KDNOliuaDev`)
    //         .then(resp => {
    //             let randomArtist = resp.data.resultsPage.results.event.performance[Math.floor(Math.random()*resp.data.resultsPage.results.event.performance.length)]
    //             // console.log(randomArtist.artist.id)
    //             axios.get(`https://api.songkick.com/api/3.0/artists/${randomArtist.artist.id}/similar_artists.json?apikey=XyKG4KDNOliuaDev`)
    //             .then(resp =>  {
    //                 if (resp.data.resultsPage.results.artist) {
    //                 console.log(resp.data.resultsPage.results.artist)
    //                 let chunkSize = 4
    //                 let index = 0
    //                 let outputArray = []
    //                 while (index < resp.data.resultsPage.results.artist.length) {
    //                     outputArray.push(resp.data.resultsPage.results.artist.slice(index, index + chunkSize))
    //                     index += chunkSize
    //                 }
    //                 console.log(outputArray)
    //                 return outputArray.map((array, key) => (
    //                     <Carousel.Item key={key} height="150"><Row>
    //                     {array.map((performer, key) => (
    //                      <Col xs={3} key={performer.id}><img
    //                     className="d-flex w-100 band-image"
    //                     width="150" height="300"
    //                     src={`//images.sk-static.com/images/media/profile_images/artists/${performer.id}/huge_avatar`}
    //                     alt="First slide"
    //                     />
    //                     <Carousel.Caption>
    //                     <h3 className="carousel-artist">{performer.displayName}</h3>
    //                     </Carousel.Caption></Col>
    //                     ))}
    //                     </Row>
    //                     </Carousel.Item>
    //                    ))
    //             }}
                   
                    
    //             )
    //             })
           
               

    //     }
    // }

    // renderSuggestedArtist = () => {
    //     if (gigDetailLoaded) {
    //         let randomKey = Object.keys(this.state.likedGigs)[Math.floor(Math.random()*Object.keys(this.state.likedGigs).length)]
    //         let randomArtist = this.state.likedGigs[randomKey][0].performance[Math.floor(Math.random()*this.state.likedGigs[randomKey][0].performance.length)]
    //         console.log(randomArtist.artist.id)
    //         let randomArtistId = randomArtist.artist.id
    //     }

    // }
      
render() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.length
    let likedGigsCount = Object.values(this.state.likedGigs).reduce(reducer, 0)
    const gigDetailLoaded = this.state.userlikedGigsId.length == likedGigsCount && likedGigsCount > 0 
    let randomArtistId = 0
    if (gigDetailLoaded) {
        let randomKey = Object.keys(this.state.likedGigs)[Math.floor(Math.random()*Object.keys(this.state.likedGigs).length)]
        let randomArtist = this.state.likedGigs[randomKey][0].performance[Math.floor(Math.random()*this.state.likedGigs[randomKey][0].performance.length)]
        console.log(randomArtist.artist.id)
        randomArtistId = randomArtist.artist.id 
    }
       
    return(
        <div>

                <h1 className="homepage-title bg-secondary">Gig Planner</h1>
                <>
                {gigDetailLoaded ? <SuggestedArtist artistId={randomArtistId}/> : <SuggestedArtistDefault />}
                </>

        <Row className="d-flex justify-content-center calendar-background">
        <Col md={{ span: 6, offset: 3 }}>
        <Calendar minDetail="month" maxDetail="month" tileClassName={this.setTileClassName} onClickDay={this.setOnClickDay}/>
        </Col>
        </Row>
        <div className="jumbotron">
            {this.state.selectedDate in this.state.likedGigs ? this.state.likedGigs[this.state.selectedDate].map((gig, key) => {
                return <div key={key}><GigDetails gig={gig} /></div>
                           
            }) : <Jumbotron>
                <h1>No gigs liked for this day</h1>
                </Jumbotron>}
        </div>
        <Row>

        </Row>
        </div>
        )
}


}




export default Homepage
