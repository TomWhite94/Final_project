import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Homepage from './Homepage'
import Registration from './auth/Registration'
import Taskbar from './Taskbar'
import Artist from './Artist'
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends React.Component {

  
render () {
    return (
      
      
    <BrowserRouter>
    <>
    <Taskbar />
    <Switch>
      
      <Route exact path="/" render={() => <Registration />} />
      <Route exact path="/homepage" render={() => <Homepage />} />
      <Route path="/artist/:id" render={(props) => <Artist key={props.match.params.id} {...props} />}/>
    </Switch>
    </>
    </BrowserRouter>
    );
  }
}

export default App
