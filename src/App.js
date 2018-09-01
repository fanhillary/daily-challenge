import React, { Component } from 'react';
import { Route, NavLink, HashRouter} from "react-router-dom";
import './App.css';
import Home from "./HomeComponent/Home";
import Analytics from "./AnalyticsComponent/Analytics";
import Registration from "./RegistrationComponent/Registration";
import firebase, { auth } from './firebase.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      disabled: false,
    }
    this.logOut = this.logOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fireBaseListener = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("logged in - app.js");
        this.setState({ user: user });
        this.setState({ disabled: false });

      } else {
        this.setState({ user: null });
        this.setState({ disabled: true });

        console.log("not logged in -app.js");
      }
    });
  }
 
  componentWillUnmount() {
    this.fireBaseListener();
  }

  logOut() {
    localStorage.clear();
    auth.signOut().then(function() {
      this.setState({user: null});
      window.location.replace("https://daily-random-challenge.herokuapp.com/?#/");
    }).catch(function(error) {
      console.log(error)
    });
  }

  handleClick(e){
    if(this.state.disabled) e.preventDefault()
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink onClick={(e) => this.handleClick(e)} to="/analytics">Analytics</NavLink></li>
              { this.state.user? <button type="button" className="btn btn-dark" onClick={this.logOut}>Log Out</button> : <button type="button" className="btn btn-dark"><NavLink to ="/register">Register or Login</NavLink></button> }
          </ul>
          <div className="content">
              <Route exact path="/" component={Home}/>
              <Route path="/analytics" component={Analytics}/>
              <Route path="/register" component={Registration}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
export default App;
