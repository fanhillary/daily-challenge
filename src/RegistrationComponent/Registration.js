import React, { Component } from 'react';
import './Registration.css';
// const {Provider, Consumer} = AuthenticationContext;
import firebase, {auth, db} from '../firebase.js';
import { withRouter } from 'react-router'

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state ={
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        login_email: "",
        login_password: "",
        warning: "",
        user: null,
    }
    this.createNewUser = this.createNewUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  /*
* Function Name: componentDidMount()
* Function Description: check for authorization through firebase listener.
* Parameters: None.
* Return: None.
*/
  componentDidMount() {
    // use listener to check for user login
    this.fireBaseListener = auth.onAuthStateChanged((user) => {
        if (user) {
            console.log("logged in");
            this.props.history.push(`/`)
          } else {
            this.setState({ user: null });
            console.log("not logged in");
          }
    });

    // change all tabs to gray out
    document.getElementById("home-tab").style.setProperty('color', 'gray');
    document.getElementById("home-tab").style.setProperty('font-weight', 'normal');

    if (document.getElementById("analytics-tab")) {
      document.getElementById("analytics-tab").style.setProperty('color', 'gray');
      document.getElementById("analytics-tab").style.setProperty('font-weight', 'normal');
    }
  }

  /*
    * Function Name: componentWillUnmount()
    * Function Description: Unmount firebase listener
    * Parameters: None.
    * Return: None.
    */
  componentWillUnmount() {
    this.fireBaseListener();
  }


  // Simple validation on given email param. Returns true if valid, else return false.
  validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) { return true }
    return false
  }

  /*
  * Description: Simple validation on given password. 
  * 6-20 characters, one lowercase, one uppercase, one digit required.
  * Returns true if valid, else return false.
  */
  validatePassword(password) {
      if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)) { return true }
      return false
  }

  /*
  * Function name: validateRegistrationForm(data)
  * Description: validates email, password, and whether passwords match. 
  * Params: data - obj holding name, email, password, confirmpassword values for validation
  * Return: true if all valid, false if invalid.
  */
  validateRegistrationForm(data) {
    if (!this.validateEmail(data.email)) {
      this.setState({warning: "The email you have entered is invalid. Please double-check!"});
      return false
    }
    if (data.password != data.confirmPassword) {
      this.setState({warning: "Your passwords do not match!"});
      return false
    }
    if (!this.validatePassword(data.password)) {
      this.setState({warning: "Your password must be 6-20 characters. Have at least one uppercase, one lowercase, and one digit."});
      return false
    }
    return true
  }

  /*
    * Function Name: createNewUser()
    * Function Description: Creates new user in fireabase 
    * Parameters: None.
    * Return: None.
    */
  createNewUser() {
    var data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
    }

    if (!this.validateRegistrationForm(data)) { return }
   
    // create firebase user with email and password if validation is passed
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then(() => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: data.name,    
        });

        db.collection("users").doc(user.email).set({
            name: user.displayName,
            completed_challenges: [],
            duplicates: false
        })

        // clear daily flag for new user
        localStorage.clear();

        // redirect to home page
        this.props.history.push(`/`);

    }
    ).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

    /*
    * Function Name: loginUser()
    * Function Description: Login user in firebase 
    * Parameters: None.
    * Return: None.
    */
  loginUser() {
    var data = {
        email: this.state.login_email,
        password: this.state.login_password
    }
    console.log("logging in");

    //sign in the user with email and password via firebase
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    .then((result) => {
        const user = result.user;

        // set the state of the user, clear daily completion flag, redirect to home
        this.setState({ user: user });
        localStorage.clear();
        this.props.history.push(`/`);

        // set error messages for login page
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (error.message === "EMAIL_NOT_FOUND") {
            this.setState({warning: "Email was not found"});
        }
        console.log(errorCode);
        console.log(errorMessage);
    });
}

  render() {
    return (
        <div className="container"> 
            <p className="form-validation"> {this.state.warning}</p>
            <div className="row">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">New to Daily Challenge?</h5>
                        <p className="card-text">Register to keep track of the challenges you've completed!</p>
                        <form onSubmit={this.createNewUser}>
                            <input type="text" className="form-control register-input" placeholder="Display Name" aria-label="Display Name" value={this.state.name} onChange = {(event) => this.setState({name: event.target.value})} aria-describedby="basic-addon1"></input>
                            <input type="email" className="form-control register-input" placeholder="Email Address" aria-label="Email Address" value={this.state.email} onChange = {(event) => this.setState({email: event.target.value})} aria-describedby="basic-addon1"></input>
                            <input type="password" className="form-control register-input" placeholder="Password" aria-label="Password" value={this.state.password} onChange = {(event) => this.setState({password: event.target.value})} aria-describedby="basic-addon1"></input>
                            <input type="password" className="form-control register-input" placeholder="Confirm Password" aria-label="Confirm Password" value={this.state.confirmPassword} onChange = {(event) => this.setState({confirmPassword: event.target.value})} aria-describedby="basic-addon1"></input>

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
                                {/* <a href="#" className="forgot-link">Forgot Password?</a> */}
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

export default withRouter(Registration);
