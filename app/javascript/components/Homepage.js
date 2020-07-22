import React, { Component } from 'react'
import Taskbar from './Taskbar'
import axios from 'axios'
let SONGKICK_URL = 'https://api.songkick.com/api/3.0/artists/379603/gigography.json?apikey=XyKG4KDNOliuaDev'

let SIMILAR_URL = 'https://api.songkick.com/api/3.0/artists/264535/similar_artists.json?apikey=XyKG4KDNOliuaDev'


class Homepage extends Component {

    

    constructor(props) {
        super(props);
        this.state = {
            likedGigs: []
        }

        
    }
   

    componentDidMount() {
        axios.get('http://localhost:3000/gigs', {withCredentials: true})
        .then(resp => this.setState({
            likedGigs: resp.data.gigs.map(gig => gig.gigId)
        })
        )
        
        
    }
      
     
      
render() {
    
    return(
        <div>
        <h1>Homepage</h1>
        <>
        {this.state.likedGigs}
        </>
            </div>
        )
}


}




export default Homepage
