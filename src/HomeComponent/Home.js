
import React, { Component } from 'react';
import './Home.css';

var listActions = ["Drink a beer or two", "Sit silently", "Don't eat", "Do a good deed", "Be kind", "High five", "Sneak into the opposite gender restroom"];
var listTarget = ["your significant other", "your pet", "your sibling", "your mother", "your father", "your friend", "someone you haven't contacted in a long time", "a distant friend", "a random stranger", "the person to your left", "the person to your right", "the person across from you", "an elder", "someone younger than you"];
var listConjunction = ["for", "with"];
var listTime = ["5 minutes", "10 minutes", "15 minutes", "30 minutes", "45 minutes", "an hour", "two hours", "half a day", "the whole day"];
var listFoods = ["sugar", "potatos", "bread", "candy", "gluten", "meat", "Chinese food", "American food", "Thai food", "Vietnamese food", "Asian food", "European food", "Italian food", "French food", "Korean food", "Mexican food", "Indian food", "Malaysian food", "Filipino food"];
var predeterminedList = ["Do one good deed", "Do two good deeds", "Do three good deeds", "Try a new fruit", "Try a new drink", "Try a new cuisine", "Go to work 15 minutes early", "Go to work 15 minutes late", "Pet a random dog"];
var noConjunctionActions = ["Don't eat any", "Only eat", "Talk to", "Spend an hour with", "Spend 30 minutes with", "Spend a day with", "Visit"];


class Home extends Component {
  constructor() {
    super();
    this.state = {
      currentChallenge: ""
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
  return Math.random() * (max - min) + min;
}


/*
* Function Name: generateChallenge
* Function Description: Create random challenge by concatenating elements
*                       from each list.
* Parameters: None.
* Return: None.
*/
  generateChallenge() {
    var randomAction = "";
    var randomConjunction = "";
    var randomEnd = "";

    // choose a random action array to select from
    var selectedArray = this.getRandomArbitrary(0,2);

    // select from listActions
    if (selectedArray === 0) {
      // obtain a random action to start with
      randomAction = listActions[Math.floor(Math.random()*listActions.length)];
      // obtain a random conjunction
      randomConjunction = listConjunction[Math.floor(Math.random()*listConjunction.length)];
      // get random appropriate ending based on conjunction chosen
      if (randomConjunction === "for") {
        randomEnd = listTime[Math.floor(Math.random()*listTime.length)];
      } else if (randomConjunction === "with") {
        randomEnd = listTarget[Math.floor(Math.random()*listTarget.length)];
      }
      // concatenate the entire sentence
      this.setState({currentChallenge: randomAction + " " + randomConjunction + " " + randomEnd + "."});

    // select from predeterminedList
    } else if (selectedArray === 1) {
      // form challenge sentence
      this.setState({currentChallenge: predeterminedList[Math.floor(Math.random()*predeterminedList.length)] + "."});

    // select from no conjunction actions
    } else {
      randomAction = noConjunctionActions[Math.floor(Math.random()*noConjunctionActions.length)];

      // select end of sentence based on selection of action
      if (randomAction === "Don't eat any" || randomAction === "Only eat") {
        randomEnd = listFoods[Math.floor(Math.random()*listFoods.length)];
      } else {
        randomEnd = listTarget[Math.floor(Math.random()*listTarget.length)];
      }

      // form challenge sentence
      this.setState({currentChallenge: randomAction+ " " + randomEnd + "."});

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

  ;
}
  render() {
    return (
      <div>
        <div>
            <h3> Your Challenge For Today</h3>
            <h1> {this.state.currentChallenge} </h1>
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

