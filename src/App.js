import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from "react-router-dom";
import './App.css';
import Home from "./HomeComponent/Home";
import Analytics from "./Analytics";
import Settings from "./Settings";
import Registration from "./Registration";

class App extends Component {
  constructor() {
    super();
  
    this.registerUser = this.registerUser.bind(this);
  }
  
  registerUser() {

  }
  render() {
    return (
      <HashRouter>
        <div className="App">
          <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/analytics">Analytics</NavLink></li>
              <li><NavLink to="/settings">Settings</NavLink></li>
              <button type="button" className="btn btn-dark"><NavLink to ="/register">Register or Login</NavLink></button>
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
