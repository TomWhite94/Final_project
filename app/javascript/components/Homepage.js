import React, { Component } from 'react'
import Taskbar from './Taskbar'
let SONGKICK_URL = 'https://api.songkick.com/api/3.0/artists/379603/gigography.json?apikey=XyKG4KDNOliuaDev'

let SIMILAR_URL = 'https://api.songkick.com/api/3.0/artists/264535/similar_artists.json?apikey=XyKG4KDNOliuaDev'


class Homepage extends Component {

    

    constructor(props) {
        super(props);
        this.state = {
            artist_search: this.props.artist_search,
            similar_artists: [],
            numOfPages: 0,
            page: 0
        }

        
    }
   

    // componentDidMount() {
      
        // fetch(SONGKICK_URL)
        //   .then(response => response.json())
        //     .then(data => this.setState({
        //         events: data.resultsPage.results.event, 
        //         page: data.resultsPage.page, 
        //         numOfPages: Math.ceil(parseInt(data.resultsPage.totalEntries) / parseInt(data.resultsPage.perPage))
        //     }))

    //     fetch(SIMILAR_URL)
    //       .then(response => response.json())
    //         .then(data => this.setState({
    //             similar_artists: data.resultsPage.results.artist, 
    //             page: data.resultsPage.page, 
    //             numOfPages: Math.ceil(parseInt(data.resultsPage.totalEntries) / parseInt(data.resultsPage.perPage))
    //         }))
          
    //   }       
      
render() {
    
    return(
        <div>
        <h1>Artists</h1>

        {/* <ul>
        {this.state.artist_search.map((resp, id) => (
            
            <li key={id}>{resp.displayName}</li>
            
        ))}
            </ul> */}
            </div>
        )
}


}




export default Homepage
