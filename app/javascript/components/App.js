import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Homepage from './Homepage'
import Registration from './auth/Registration'

class App extends React.Component {
  render () {
    return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Registration />} />
      <Route exact path="/homepage" render={() => <Homepage />} />
    </Switch>
    </BrowserRouter>
    );
  }
}

export default App
