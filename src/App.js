import React, { Component } from 'react';
import { Route, NavLink, Switch, Link, withRouter} from "react-router-dom";
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
    this.analyticsTabClicked = this.analyticsTabClicked.bind(this);
    this.homeTabClicked = this.homeTabClicked.bind(this);
  }

  /*
  * Function Name: componentDidMount()
  * Function Description: Check for authentication and set UI appropriately
  * Parameters: None.
  * Return: None.
  */
  componentDidMount() {
    console.log(this.props);
    console.log(localStorage);
    // always check if logged in
    this.fireBaseListener = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        localStorage.setItem("logged_on", true);
        localStorage.setItem("user", JSON.stringify(user));
        this.setState({ user: user });
        this.setState({ disabled: false });
      } else {
        this.setState({ user: null });
        this.setState({ disabled: true });
      }
    });
    
  }
 
  /*
  * Function Name: componentWillUnmount()
  * Function Description: unmount the firebase listener to prevent memory leaks
  * Parameters: None.
  * Return: None.
  */
  componentWillUnmount() {
    // unmount the listener
    this.fireBaseListener();
  }

  /*
  * Function Name: logOut()
  * Function Description: log user out of firebase and clear local storage
  * Parameters: None.
  * Return: None.
  */
  logOut() {
    console.log("logging out");
    // sign out the user
    auth.signOut().then(() => {
      localStorage.clear();
      this.setState({user: null});
      this.setState({disabled: false});
      this.props.history.push('/');
      document.body.style.setProperty('background-color', '#FFCC00');
      document.body.style.transition = "all 1s ease-out";
    }).catch(function(error) {
      console.log(error)
    });
  }
   
  /*
  * Function Name: analyticsTabClicked()
  * Function Description: change UI to make analytics tab active.
  * Parameters: e - clicking event to prevent events default.
  * Return: None.
  */
  analyticsTabClicked(e){
    // don't go to analytics page if the user is not logged in
    document.getElementById("home-tab").style.setProperty('color', 'gray');
    document.getElementById("home-tab").style.setProperty('font-weight', 'normal');

    document.getElementById("analytics-tab").style.setProperty('font-weight', 'bold');
    document.getElementById("analytics-tab").style.setProperty('color', 'white');
    if(this.state.disabled) { 
      e.preventDefault()
    }
  }

  /*
  * Function Name: homeTabClicked()
  * Function Description: change UI to make Home tab active.
  * Parameters: e - clicking event to prevent events default.
  * Return: None.
  */
  homeTabClicked(e) {
    document.getElementById("home-tab").style.setProperty('color', 'white');
    document.getElementById("home-tab").style.setProperty('font-weight', 'bold');

    if (document.getElementById("analytics-tab")) {
      document.getElementById("analytics-tab").style.setProperty('color', 'gray');
      document.getElementById("analytics-tab").style.setProperty('font-weight', 'normal');
    }
  }

  render() {
    return (
        <div className="App">
          <ul className="header">
              <li><Link id="home-tab" to="/" onClick={(e) => this.homeTabClicked(e)}>Home</Link></li>
              { this.state.user? 
                <li><Link id="analytics-tab" className ="analytics-tab" onClick={(e) => this.analyticsTabClicked(e)} to="/analytics">Analytics</Link></li>
              : 
              null 
              }
              { this.state.user? <button type="button" className="btn btn-dark" onClick={this.logOut}>Log Out</button> : <button type="button" className="btn btn-dark"><NavLink to ="/register">Register or Login</NavLink></button> }
          </ul>
          <Switch>
            <Route exact path="/">
              <Home user={this.state.user}/>
            </Route>
            <Route path="/analytics">
              <Analytics user={this.state.user}/>
            </Route>
            <Route path="/register" component={Registration}/>
          </Switch>
        </div>
    );
  }
}


export default withRouter(App);
