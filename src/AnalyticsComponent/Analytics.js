/*global google*/

import React, { Component } from 'react';
import "./Analytics.css";
import { auth, db } from '../firebase.js';

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// const settings = {
//   timestampsInSnapshots: true
// };
// db.settings(settings);

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      totalCompleted: 0,
      categoryPieData: [],
      completed_challenges: [],
    };
  }

  /*
  * Function Name: componentWillMount()
  * Function Description: Set up firebase listener for authentication checking
  * Parameters: None.
  * Return: None.
  */
  componentWillMount() {
    // check for authentication changes for firebase
    this.fireBaseListener = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("logged in - analytics");
        this.setState({ user: user });
        console.log(this.state.user);
        this.getCompletedChallenges();
      } else {

        // autodirect to home tab if guest user.
        this.setState({ user: null });
        console.log("not logged in - analytics");
        this.props.history.push(`/`);

      }
    });

    
    document.getElementById("home-tab").style.setProperty('color', 'gray');
    document.getElementById("home-tab").style.setProperty('font-weight', 'normal');

    document.getElementById("analytics-tab").style.setProperty('font-weight', 'bold');
    document.getElementById("analytics-tab").style.setProperty('color', 'white');

  }

  /*
  * Function Name: componentWillUnmount()
  * Function Description: Unmount listener for firebase
  * Parameters: None.
  * Return: None.
  */
  componentWillUnmount() {
    // cancel the listener
    this.fireBaseListener();
  }

  /*
  * Function Name: getCompletedChallenges()
  * Function Description: Create random challenge upon loading of page.
  * Parameters: None.
  * Return: None.
  */
  getCompletedChallenges() {
    var docRef = db.collection("users").doc(this.state.user.email);

    docRef.get().then((doc) => {
      // get the data of completed challenges 
      var user_data = doc.data();

      // get the total completed and get the most recent 10 challenges
      this.setState({ totalCompleted: user_data.completed_challenges.length });
      this.setState({ completed_challenges: user_data.completed_challenges.reverse().slice(0, 10)});

      // calculate pie chart category count
      var completed_challenges = user_data.completed_challenges;
      var categoriesCompleted = {
        "Action": 0,
        "Food": 0,
        "Finance": 0,
        "Exercise": 0,
        "Communication": 0
      };

      // count each of the categories completed
      for (let i in completed_challenges) {
        categoriesCompleted[completed_challenges[i].type]++;
      }

      // push into an array for more appropriate usage
      for (var category in categoriesCompleted) {
        this.state.categoryPieData.push([category, categoriesCompleted[category]]);
      }

      // create google pie chart with categories data
      var data = new google.visualization.DataTable();
      data.addColumn('string', "Category");
      data.addColumn('number', "Count");
      data.addRows(this.state.categoryPieData);
      var options = {
      width:450,
      height:350,
      is3D: true
     };
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);

      })
  }

  render() {
    return (
      <div>
      <div className="container">
        <div className ="row">
          <div className="card bg-light mb-3" id="total-card">
            <div className="card-body">
                <h5 className="card-title">You've conquered a total of</h5>
                <p className="card-text total-completed-challenges">{this.state.totalCompleted}</p>
                <p className="card-text">challenges</p>
            </div>
          </div>
        </div>
        <div className = "row">
          <div className = "col-md-6">
            <div className="analytics-card">
              <div className="card-body">
                  <h5 className="card-title">Categories Completed</h5>
                  <div id="chart_div"></div>
                </div>
            </div>
          </div>
          <div className = "col-md-6">
            <div className="analytics-card">
                <div className="card-body">
                    <h5 className="card-title">History of Completed</h5>
                      {this.state.completed_challenges.map(function(challenge, i) {
                        return <p className="challenge-history" key={i}> {challenge.date_completed.toDate().getMonth()}/{challenge.date_completed.toDate().getDate()}/{challenge.date_completed.toDate().getFullYear()}  {challenge.challenges} </p>
                      })}                
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Analytics;