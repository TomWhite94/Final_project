import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Homepage from './Homepage'
import Registration from './auth/Registration'
import Taskbar from './Taskbar'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        artist_search: this.props.artist_search
    }
}
  
render () {
    return (
      <>
      <Taskbar artist_search={this.state.artist_search}/>
    <BrowserRouter>
    <Switch>
      
      <Route exact path="/" render={() => <Registration />} />
      <Route exact path="/homepage" render={() => <Homepage artist_search={this.state.artist_search}/>} />
    </Switch>
    </BrowserRouter>
    </>
    );
  }
}

export default App
