import React, { Component } from 'react';
import { Route, NavLink, HashRouter, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from "./HomeComponent/Home";
import Analytics from "./AnalyticsComponent/Analytics";
import Settings from "./Settings";
import Registration from "./RegistrationComponent/Registration";
import firebase, { auth } from './firebase.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
    this.logOut = this.logOut.bind(this);
  }
 
  logOut() {
    auth.signOut().then(function() {
      this.setState({user: null});
    }).catch(function(error) {
      console.log(error)
    });
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/analytics">Analytics</NavLink></li>
              <li><NavLink to="/settings">Settings</NavLink></li>
              { this.state.user? <button type="button" className="btn btn-dark" onClick={this.logOut}>Log Out</button> : <button type="button" className="btn btn-dark"><NavLink to ="/register">Register or Login</NavLink></button> }
          </ul>
          <div className="content">
              <Route exact path="/" component={Home}/>
              <Route path="/analytics" component={Analytics}/>
              <Route path="/settings" component={Settings}/>
              <Route path="/register" component={Registration}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
export default App;
