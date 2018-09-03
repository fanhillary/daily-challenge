import React, { Component } from 'react';
import { Route, NavLink, HashRouter} from "react-router-dom";
import './App.css';
import Home from "./HomeComponent/Home";
import Analytics from "./AnalyticsComponent/Analytics";
import Registration from "./RegistrationComponent/Registration";
import { auth } from './firebase.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      disabled: false,
    }
    this.logOut = this.logOut.bind(this);
    this.homeTabClicked = this.homeTabClicked.bind(this);
    this.analyticsTabClicked = this.analyticsTabClicked.bind(this);
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
    document.getElementById("home-tab").style.setProperty('color', 'white');
    document.getElementById("home-tab").style.setProperty('font-weight', 'bold');
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

  homeTabClicked() {
    document.getElementById("home-tab").style.setProperty('color', 'white');
    document.getElementById("home-tab").style.setProperty('font-weight', 'bold');

    document.getElementById("analytics-tab").style.setProperty('color', 'gray');
  }
    
  analyticsTabClicked(e){
    if(this.state.disabled) {
      e.preventDefault()
    } else {
      document.getElementById("home-tab").style.setProperty('color', 'gray');
      document.getElementById("analytics-tab").style.setProperty('color', 'white');
      document.getElementById("analytics-tab").style.setProperty('font-weight', 'bold');

    }
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <ul className="header">
              <li><NavLink id="home-tab" to="/" onClick={(e) => this.homeTabClicked()}>Home</NavLink></li>
              <li><NavLink id="analytics-tab" className ="analytics-tab" onClick={(e) => this.analyticsTabClicked(e)} to="/analytics">Analytics</NavLink></li>
              { this.state.user? <button type="button" className="btn btn-dark" onClick={this.logOut}>Log Out</button> : <button type="button" className="btn btn-dark"><NavLink to ="/register">Register or Login</NavLink></button> }
          </ul>
          <span className="guest-hover-tip"> Log In or Register to view your challenge analytics! </span>
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
