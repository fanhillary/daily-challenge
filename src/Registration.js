import React, { Component } from 'react';
import './App.css';
class Registration extends Component {
  render() {
    return (
    <div className="container"> 
        <div class="row">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">New to Daily Challenge?</h5>
                    <p className="card-text">Register to use all features and keep track of the challenges you've completed!</p>
                    <input type="text" className="form-control register-input" placeholder="First Name" aria-label="First Name" aria-describedby="basic-addon1"></input>
                    <input type="text" className="form-control register-input" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
                    <input type="email" className="form-control register-input" placeholder="Email Address" aria-label="Email Address" aria-describedby="basic-addon1"></input>

                    <input type="text" className="form-control register-input" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"></input>

                    <a href="#" className="btn btn-primary">Register</a>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="card-contents">
                        <h5 className="card-title">Returning User?</h5>
                        <p className="card-text">Log In to view analytics and change your settings!</p>
                        <input type="text" className="form-control register-input" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
                        <input type="text" className="form-control register-input" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"></input>
                        <a href="#" className="forgot-link">Forgot Password?</a>
                        <a href="#" className="btn btn-primary">Login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
      );
    }
}

export default Registration;