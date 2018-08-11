import React, { Component } from 'react';
import './Registration.css';
class Registration extends Component {
  constructor() {
    super();
    this.state ={
        first_name: "",
        email: "",
        password: ""
    }
    this.createNewUser = this.createNewUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  createNewUser() {
    var data = {
        first_name: this.state.first_name,
        email: this.state.email,
        password: this.state.password
    }
    console.log(data);

    fetch('http://localhost:3000/create-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function(response) {  // returns a promise
        console.log(response);
        response.json().then(function(data) {
            console.log(data)
        });
        }).catch(function(err) {
        console.log(err)
    });
  }

  loginUser() {
      console.log("check login!");

  }

  render() {
    return (
    <div className="container"> 
        <div className="row">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">New to Daily Challenge?</h5>
                    <p className="card-text">Register to use all features and keep track of the challenges you've completed!</p>
                    <form onSubmit={this.createNewUser}>
                        <input type="text" className="form-control register-input" placeholder="First Name" aria-label="First Name" value={this.state.first_name} onChange = {(event) => this.setState({first_name: event.target.value})} aria-describedby="basic-addon1"></input>
                        <input type="email" className="form-control register-input" placeholder="Email Address" aria-label="Email Address" value={this.state.email} onChange = {(event) => this.setState({email: event.target.value})} aria-describedby="basic-addon1"></input>
                        <input type="password" className="form-control register-input" placeholder="Password" aria-label="Password" value={this.state.password} onChange = {(event) => this.setState({password: event.target.value})} aria-describedby="basic-addon1"></input>

                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="card-contents">
                        <form onSubmit={this.loginUser}>
                            <h5 className="card-title">Returning User?</h5>
                            <p className="card-text">Log In to view analytics and change your settings!</p>
                            <input type="text" className="form-control register-input" placeholder="Email Address" aria-label="Email Address" aria-describedby="basic-addon1"></input>
                            <input type="text" className="form-control register-input" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"></input>
                            <a href="#" className="forgot-link">Forgot Password?</a>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
      );
    }
}

export default Registration;