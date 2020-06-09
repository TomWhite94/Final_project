import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Homepage from './Homepage'

class App extends React.Component {
  render () {
    return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Homepage />} />
    </Switch>
    </BrowserRouter>
    );
  }
}

export default App
