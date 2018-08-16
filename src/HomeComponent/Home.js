
import React, { Component } from 'react';
import './Home.css';

var categories = ["Action", "Food", "Finance", "Exercise", "Communication"];
var listAction = ["Drink a beer or two", "Sit silently", "Do a good deed", "Be kind", "High five", "Sneak into the opposite gender restroom"];
var listActionPre = ["Don't produce any waste today.", "Do one good deed.", "Do two good deeds.", "Do three good deeds.","Go to work 15 minutes early.", "Go to work 15 minutes late.", "Pet a random dog."];
var listFood = ["Don't eat any", "Only eat"];
var listFoodPre = ["Try a new fruit.", "Try a new drink.", "Try a new cuisine."];
var listFinance = ["Spend a maximum of", "Spend a minimum of"];
var financeTarget = ["50 cents", "$1", "$5", "$10", "$50", "$100"];
var listCommunication = ["Talk to", "Spend an hour with", "Spend 30 minutes with", "Spend a day with", "Visit"]
var listExercise = ["Run", "Walk", "Jog"];
var listExerciseNoConj = ["Do 10", "Do 50", "Do 100"];
var exerciseTarget = ["push-ups", "sit-ups", "squats"];
var targets = ["your significant other", "your pet", "your sibling", "your mother", "your father", "your friend", "someone you haven't contacted in a long time", "a distant friend", "a random stranger", "the person to your left", "the person to your right", "the person across from you", "an elder", "someone younger than you"];
var listConjunction = ["for", "with"];
var duration = ["5 minutes", "10 minutes", "15 minutes", "30 minutes", "45 minutes", "an hour", "two hours", "half a day", "the whole day"];
var foodTarget = ["sugar", "potatos", "bread", "candy", "gluten", "meat", "Chinese food", "American food", "Thai food", "Vietnamese food", "Asian food", "European food", "Italian food", "French food", "Korean food", "Mexican food", "Indian food", "Malaysian food", "Filipino food"];
var loggedIn = false;
import firebase, { auth } from '../firebase.js';

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    loggedIn = true;
    console.log(loggedIn);
  } else {
    loggedIn = false;
    console.log(loggedIn);

  }
});
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChallenge: "",
      category: "",
      completedChallenges: [],
      loggedIn: false,
      user_id: null,
      first_name: ""
    };
  
    this.generateChallenge = this.generateChallenge.bind(this);
    this.completeChallenge = this.completeChallenge.bind(this);
    this.undoCompletion = this.undoCompletion.bind(this);
  }

/*
* Function Name: componentDidMount()
* Function Description: Create random challenge upon loading of page.
* Parameters: None.
* Return: None.
*/
  componentDidMount() {
    this.generateChallenge();
  }


/*
* Function Name: getRandomArbitrary
* Function Description: Return whole number between the two given parameters
* Parameters:
*   int min - the minimum inclusive of range to select from
*   int max - the maxomum inclusive of range to select from
* Return: Randomly selected whole number between range given.
*/
getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


/*
* Function Name: generateChallenge
* Function Description: Create random challenge by concatenating elements
*                       from each list.
* Parameters: None.
* Return: None.
*/
  generateChallenge() {
    var randomVerb = "";
    var randomConjunction = "";
    var randomEnd = "";

    // choose a random action array to select from
    var selectedCategory = this.getRandomArbitrary(0,4);
     // Action Category
     if (selectedCategory === 0) { 
      var actionType = this.getRandomArbitrary(0,1);

      if (actionType === 0) {
        // obtain a random action to start with
        randomVerb = listAction[Math.floor(Math.random()*listAction.length)];
        // obtain a random conjunction
        randomConjunction = listConjunction[Math.floor(Math.random()*listConjunction.length)];
        // get random appropriate ending based on conjunction chosen
        if (randomConjunction === "for") {
          randomEnd = duration[Math.floor(Math.random()*duration.length)];
        } else if (randomConjunction === "with") {
          randomEnd = targets[Math.floor(Math.random()*targets.length)];
        }
        // concatenate the entire sentence
        this.setState({currentChallenge: randomVerb + " " + randomConjunction + " " + randomEnd + "."});
      } else {
        this.setState({currentChallenge: listActionPre[Math.floor(Math.random()*listActionPre.length)]});
      }
      this.setState({category: "Action"});


      // Food Category
    } else if (selectedCategory === 1) { 
      var foodType = this.getRandomArbitrary(0,1);

      if (foodType === 0) {
        randomVerb= listFood[Math.floor(Math.random()*listFood.length)];
        randomEnd = foodTarget[Math.floor(Math.random()*foodTarget.length)];
        this.setState({currentChallenge: randomVerb + " " + randomEnd + "."});
      } else {
        this.setState({currentChallenge: listFoodPre[Math.floor(Math.random()*listFoodPre.length)]});
      }

      this.setState({category: "Food"});


      // Finance Category
    } else if (selectedCategory === 2) {
      randomVerb= listFinance[Math.floor(Math.random()*listFinance.length)];
      randomEnd = financeTarget[Math.floor(Math.random()*financeTarget.length)];
      this.setState({currentChallenge: randomVerb + " " + randomEnd + "."});
      this.setState({category: "Finance"});

      // Communication Category
    } else if (selectedCategory === 3) {
      randomVerb= listCommunication[Math.floor(Math.random()*listCommunication.length)];
      randomEnd = targets[Math.floor(Math.random()*targets.length)];
      this.setState({currentChallenge: randomVerb + " " + randomEnd + "."});
      this.setState({category: "Communication"});

      // Exercise Category
    } else {
      var exerciseType = this.getRandomArbitrary(0,1);
      if (exerciseType === 0) {
        randomVerb= listExercise[Math.floor(Math.random()*listExercise.length)];
        randomConjunction = listConjunction[Math.floor(Math.random()*listConjunction.length)];
        
        // get random appropriate ending based on conjunction chosen
        if (randomConjunction === "for") {
          randomEnd = duration[Math.floor(Math.random()*duration.length)];
        } else if (randomConjunction === "with") {
          randomEnd = targets[Math.floor(Math.random()*targets.length)];
        }
        this.setState({currentChallenge: randomVerb + " " + randomConjunction + " " + randomEnd + "."});

      } else {
        randomVerb= listExerciseNoConj[Math.floor(Math.random()*listExerciseNoConj.length)];
        randomEnd = exerciseTarget[Math.floor(Math.random()*exerciseTarget.length)];
        this.setState({currentChallenge: randomVerb + " " + randomEnd + "."});
      }
      this.setState({category: "Exercise"});

    }
  }
  
/*
* Function Name: completeChallenge
* Function Description: Saves the challenge into complete database and changes css appropriately.
* Parameters: None.
* Return: None.
*/
  completeChallenge() {
    document.getElementById("refreshChallenge").disabled = true;
    document.body.style.setProperty('background-color', 'MediumSeaGreen');
    document.body.style.transition = "all 1s ease-out";

    // add command to database
    let data = {
      commands: this.state.currentChallenge,
      type: this.state.category,
      users: 0,
    };

    // xmlhttprequest()
    fetch('http://localhost:3000/new-command', {
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

  /*
* Function Name: undoCompletion()
* Function Description: Un-saves the challenge from completion and changes css appropriately.
* Parameters: None.
* Return: None.
*/
undoCompletion() {
  document.getElementById("refreshChallenge").disabled = false;
  document.body.style.setProperty('background-color', '#FFCC00');
  document.body.style.transition = "all 1s ease-out";

  // remove command from database
  let data = {
    commands: this.state.currentChallenge,
    type: this.state.category,
    users: 0,
  };

  // xmlhttprequest()
  fetch('http://localhost:3000/remove-command', {
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
  render() {
    return (
      <div>
        <div>
            {/* { this.state.loggedIn ? <h2> Hi, {this.props.first_name}</h2> : null } */}
            { loggedIn ? <h2> Hello! </h2> : null }
            <h3> Your Challenge For Today</h3>
            <h1> {this.state.currentChallenge} </h1>
            <p> Category: {this.state.category} </p>
            <button type="button" id="refreshChallenge" onClick={this.generateChallenge} className="btn btn-light">Reroll another challenge!</button>
        </div>

        <form className="form">
          <div id="completionForm">
            <div className="completionBtnGroup btn-group btn-group-toggle" data-toggle="buttons">
              <label htmlFor="completeOption1" className="completeBtn btn btn-secondary active" onClick={this.undoCompletion}>
                <input type="radio" name="completeOption1" id="incomplete" autoComplete="off" defaultChecked/> Incomplete 
              </label>

              <label htmlFor="completeOption2" className="completeBtn btn btn-secondary" onClick={this.completeChallenge}>
                <input name="completeOption2" type="radio" id="complete" autoComplete="off" /> Complete
              </label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Home;

