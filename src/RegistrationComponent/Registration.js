import React, { Component } from 'react';
import './Registration.css';
// const {Provider, Consumer} = AuthenticationContext;
import firebase, {auth} from '../firebase.js';
import { withRouter } from 'react-router'


class Registration extends Component {
  constructor(props) {
    super(props);
    this.state ={
        // TODO: Figure out how to not use separate state values for each input
        email: "",
        password: "",
        login_email: "",
        login_password: "",
        warning: "",
        user: null,
    }
    this.createNewUser = this.createNewUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("logged in");
        this.props.history.push(`/`)
      } else {
        console.log("not logged in");
      }
    });
  }

  createNewUser() {
    var data = {
        email: this.state.email,
        password: this.state.password
    }
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (error.message) {
            this.setState({warning: error.message});
        }
        console.log(errorCode);
        console.log(errorMessage);
      });

    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    .then((result) => {
        const user = result.user;
        this.setState({ user: user });
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (error.message) {
            this.setState({warning: error.message});
        }
        console.log(errorCode);
        console.log(errorMessage);
    });
}

  loginUser() {
    var data = {
        email: this.state.login_email,
        password: this.state.login_password
    }
    console.log("logging in");
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    .then((result) => {
        const user = result.user;
        this.setState({ user: user });
        this.props.history.push(`/`);
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (error.message) {
            this.setState({warning: error.message});
        }
        console.log(errorCode);
        console.log(errorMessage);
    });
}

  render() {
    return (
    // <Consumer> {
    //     value =>
        <div className="container"> 
            {this.state.warning}
            <div className="row">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">New to Daily Challenge?</h5>
                        <p className="card-text">Register to use all features and keep track of the challenges you've completed!</p>
                        <form onSubmit={this.createNewUser}>
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
                                <input type="email" className="form-control register-input" placeholder="Email Address" aria-label="Email Address" value={this.state.login_email} onChange = {(event) => this.setState({login_email: event.target.value})} aria-describedby="basic-addon1"></input>
                                <input type="password" className="form-control register-input" placeholder="Password" aria-label="Password" value={this.state.login_password} onChange = {(event) => this.setState({login_password: event.target.value})} aria-describedby="basic-addon1"></input>
                                <a href="#" className="forgot-link">Forgot Password?</a>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    // }
    // </Consumer>
      );
    }
}

export default withRouter(Registration);
