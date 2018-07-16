import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from "react-router-dom";
import './App.css';
import Home from "./HomeComponent/Home";
import Analytics from "./Analytics"
import Settings from "./Settings"

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/analytics">Analytics</NavLink></li>
              <li><NavLink to="/settings">Settings</NavLink></li>
          </ul>
          <button type="button" className="btn btn-dark">Register</button>
          <div className="content">
              <Route exact path="/" component={Home}/>
              <Route path="/analytics" component={Analytics}/>
              <Route path="/settings" component={Settings}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
export default App;
