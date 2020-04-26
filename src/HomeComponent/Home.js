
import React, { Component } from 'react';
import './Home.css';
import { db } from '../firebase.js';
import schedule from 'node-schedule';
import { withRouter } from 'react-router';

// var categories = ["Action", "Food", "Finance", "Exercise", "Communication"];
var listAction = ["Drink a beer or two", "Sit silently", "Do a good deed", "Be kind", "High five", "Sneak into the opposite gender restroom", "Do a silly dance", "Go outside", "Go out tonight"];
var listActionPre = ["Don't produce any waste today.", "Do one good deed.", "Do two good deeds.", "Do three good deeds.","Go to work 15 minutes early.", "Go to work 15 minutes late.", "Pet a random dog."];
var listFood = ["Don't eat any", "Only eat", "Try a new"];
var listFinance = ["Spend a maximum of", "Spend a minimum of", "Save a total of"];
var financeTarget = ["50 cents", "$1", "$5", "$10", "$50", "$100"];
var listCommunication = ["Talk to", "Spend an hour with", "Spend 30 minutes with", "Spend a day with", "Visit"]
var listExercise = ["Run", "Walk", "Jog", "Climb", "Skip"];
var listExerciseNoConj = ["Do 10", "Do 25", "Do 50", "Do 75", "Do 100"];
var exerciseTarget = ["push-ups", "sit-ups", "squats", "jumping jacks", "burpees", "high knees", "stretches"];
var targets = ["your significant other", "your pet", "your sibling", "your mother", "your best friend", "your father", "your friend", "someone you haven't contacted in a long time", "a distant friend", "a random stranger", "the person to your left", "the person to your right", "the person across from you", "an elder", "someone younger than you"];
var listConjunction = ["for", "with"];
var duration = ["5 minutes", "10 minutes", "15 minutes", "30 minutes", "45 minutes", "an hour", "two hours", "half a day", "the whole day"];
var foodTarget = ["sugar", "potatoes", "bananas", "fruit", "bread", "candy", "gluten", "meat", "Chinese food", "American food", "Thai food", "Vietnamese food", "Asian food", "European food", "Italian food", "French food", "Korean food", "Mexican food", "Indian food", "Malaysian food", "Filipino food"];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChallenge: "",
      category: "",
      completed: false,
      user: null,
    };
  
    this.generateChallenge = this.generateChallenge.bind(this);
    this.completeChallenge = this.completeChallenge.bind(this);
  }

/*
* Function Name: componentDidMount()
* Function Description: Create random challenge upon loading of page.
* Parameters: None.
* Return: None.
*/
  componentDidMount() {
    // yellow default background
    document.body.style.setProperty('background-color', '#FFCC00');
    document.getElementById("home-tab").style.setProperty('color', 'white');
    document.getElementById("home-tab").style.setProperty('font-weight', 'bold');
  
    // if user has already completed a challenge today, display appropriate message
    if (localStorage.getItem("flag_daily_complete") === "true") {
      document.body.style.setProperty('background-color', 'MediumSeaGreen');
      document.body.style.transition = "all 1s ease-out";
    } else { // if haven't completed today, get challenge
      document.body.style.setProperty('background-color', '#FFCC00');
      document.body.style.transition = "all 1s ease-out";

      // if haven't generated a challenge, generate one. Otherwise, use the previously generated one.
      if (!localStorage.getItem("currChallenge")) {
        this.generateChallenge();
      } else { // to prevent regenerate on refresh. 
        let challenge = JSON.parse(localStorage.getItem("currChallenge"))
        this.setState({currentChallenge: challenge.currentChallenge});
        this.setState({category: challenge.category})
      }
    }
    schedule.scheduleJob('0 0 * * *', () => { localStorage.clear()}) // run everyday at midnight
    if (this.props.user) {
      this.setState({user: this.props.user});
    }
  }

/*
* Called whenever App.js is rerendered to reset user state.
* Params: nextProps - prop object holding user prop passed into Home
*/
componentWillReceiveProps(nextProps) {
  if (nextProps.user) {
    this.setState({user: nextProps.user});
  } else {
      this.setState({user: null});
  }
}

/*
* Called whenever Home.js is rerendered in App.js with a new user prop passed in. 
* Then it can rerender when it catches the update in user prop.
* Params: nextProps - prop object holding user prop passed into Home
*/
componentDidUpdate(nextProps) {
  if (this.props !== nextProps) {
    console.log("update user");
    this.setState({user: nextProps.user});
  }
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
    let challenge = "";
    let category = "";
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
        challenge = randomVerb + " " + randomConjunction + " " + randomEnd + ".";
      } else {
        challenge = listActionPre[Math.floor(Math.random()*listActionPre.length)];
      }
      category = "Action";

      // Food Category
    } else if (selectedCategory === 1) { 
      randomVerb= listFood[Math.floor(Math.random()*listFood.length)];
      randomEnd = foodTarget[Math.floor(Math.random()*foodTarget.length)];
      challenge = randomVerb + " " + randomEnd + ".";
      category = "Food";


      // Finance Category
    } else if (selectedCategory === 2) {
      randomVerb= listFinance[Math.floor(Math.random()*listFinance.length)];
      randomEnd = financeTarget[Math.floor(Math.random()*financeTarget.length)];
      challenge = randomVerb + " " + randomEnd + ".";
      category = "Finance";

      // Communication Category
    } else if (selectedCategory === 3) {
      randomVerb= listCommunication[Math.floor(Math.random()*listCommunication.length)];
      randomEnd = targets[Math.floor(Math.random()*targets.length)];
      challenge = randomVerb + " " + randomEnd + ".";
      category = "Communication";

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
        challenge = randomVerb + " " + randomConjunction + " " + randomEnd + ".";

      } else {
        randomVerb= listExerciseNoConj[Math.floor(Math.random()*listExerciseNoConj.length)];
        randomEnd = exerciseTarget[Math.floor(Math.random()*exerciseTarget.length)];
        challenge = randomVerb + " " + randomEnd + ".";
      }
      category = "Exercise";
    }
      const challengeDetails = {
        "currentChallenge": challenge,
        "category": category,
      }    
      localStorage.setItem("currChallenge", JSON.stringify(challengeDetails));
      this.setState({currentChallenge: challenge});
      this.setState({category: category});
  }
  
/*
* Function Name: completeChallenge
* Function Description: Saves the challenge into complete database and changes css appropriately.
* Parameters: None.
* Return: None.
*/
  completeChallenge() {
    if (document.getElementById("refreshChallenge")) {
      document.getElementById("refreshChallenge").disabled = true;
    }
    document.body.style.setProperty('background-color', 'MediumSeaGreen');
    document.body.style.transition = "all 1s ease-out";

    if(this.state.currentChallenge !== "" && this.state.currentChallenge !== null) {
      if(this.props.user) {
        var docRef = db.collection("users").doc(this.props.user.email);

        docRef.get().then((doc) => {
          if (doc.exists) { // if user exists
            // obtain current completed challenges from firestore
            var user_data = doc.data();
            let new_data = {
              challenges: this.state.currentChallenge,
              type: this.state.category,
              date_completed: new Date(),
            };
            console.log("Document data:", user_data);

            // if the data document has no data, insert first of its kind
            if(user_data.completed_challenges == null) {
              console.log("empty data");
              docRef.set({
                name: this.props.user.displayName,
                completed_challenges: [new_data],
                duplicates: false
              });
            } else { // tack on newly completed challenge into firestore
              var updated_challenges = user_data.completed_challenges;
              updated_challenges.push(new_data);
              docRef.set({
                name: this.props.user.displayName,
                completed_challenges: updated_challenges,
                duplicates: false
              });
            }
          }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
      } else {
        console.log("guest user")
      }
      localStorage.setItem( 'flag_daily_complete', true );
      this.setState({completed: true});
    }
  }

  render() {
    return (
      <div>
        <div>
            { this.state.user ? <h2> Hi {this.state.user.displayName}! </h2> : <h2> Hi Guest! </h2> }
            { localStorage.getItem("flag_daily_complete") === "true" ? <h1> Congratulations! </h1> :
            <div className="prompt"> 
              <h3> Today's Challenge:</h3> 
              <h1 className="challenge"> {this.state.currentChallenge} </h1>
              <p> Category: {this.state.category} </p>
              <button type="button" id="refreshChallenge" onClick={this.generateChallenge} className="btn btn-light">Reroll for another challenge!</button>
            </div>

            }
        </div>

        
        {  localStorage.getItem("flag_daily_complete") === "true" ?
          <div className="form-container">
            <h2> You've completed your daily task. </h2>
            <br></br>
            { this.props.user?
              <h4> You will receive a new challenge after midnight! Meanwhile, check out the analytics tab. </h4>
              :
              <h4> You will receive a new challenge after midnight! Register to view your analytics! </h4>
            }
          </div>
          :
          <div className="form-container">
            <form>
              <div>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">

                  <label htmlFor="completeOption1" className="completeBtn btn btn-secondary active">
                    <input type="radio" name="completeOption1" id="incomplete" autoComplete="off" defaultChecked/> Incomplete
                  </label>  
                  <label htmlFor="completeOption2" className="completeBtn btn btn-secondary" onClick={this.completeChallenge}>
                    <input name="completeOption2" type="radio" id="complete" autoComplete="off" /> Complete
                  </label>
                </div>
              </div>
            </form>
          </div>
        }
        <div className="note">
          <p> Note: Only one challenge can be completed per day and it cannot be undone. </p>
        </div>
      </div>
    );
  }
}
export default withRouter(Home);

