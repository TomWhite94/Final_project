import React, { Component } from 'react';


let ARTIST_SEARCH = "https://api.songkick.com/api/3.0/search/artists.json?apikey=XyKG4KDNOliuaDev&query=Squid"

class Taskbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artist_search: [],
            numOfPages: 0,
            page: 0
        }

        
    }
   
    componentDidMount() {
        fetch(ARTIST_SEARCH)
          .then(response => response.json())
            .then(data => this.setState({
                artist_search: data.resultsPage.results.artist, 
                page: data.resultsPage.page, 
                numOfPages: Math.ceil(parseInt(data.resultsPage.totalEntries) / parseInt(data.resultsPage.perPage))
            }))
        }
          
        


render() {
    return(
       <div>
        <input type="text" placeholder="Artist Search.."></input>
        
        </div>
        
    )
}


}


export default Taskbar