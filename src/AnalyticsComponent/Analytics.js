/*global google*/
// important - above line is necessary for google chart
import React, { Component } from 'react';
import "./Analytics.css";
import { db } from '../firebase.js';
import { withRouter } from 'react-router';

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCompleted: 0,
      categoryPieData: [],
      completed_challenges: [],
    };
  }

  /*
  * Function Name: componentDidMount()
  * Function Description: Check if logged_on is active in local storage. If not, route to home page. 
  *                       If so, apply draw chart listeners and render page.
  * Parameters: None.
  * Return: None.
  */
  componentDidMount() {
    console.log(this.state.completed_challenges);
    // if not logged on, redirect to home.
    if (!localStorage.getItem("logged_on")) {
      this.props.history.push('/');
    }
    console.log(localStorage);
    if (localStorage.getItem("user")) { 
      this.getCompletedChallenges(JSON.parse(localStorage.getItem("user")));
      window.onload = this.drawChart;
      window.onresize = this.drawChart;
    }
  }
  /*
  * Function Name: getCompletedChallenges()
  * Function Description: Create random challenge upon loading of page.
  * Parameters: None.
  * Return: None.
  */
  getCompletedChallenges(user) {
    var docRef = db.collection("users").doc(user.email);
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
      localStorage.setItem("categoryPieData", JSON.stringify(this.state.categoryPieData))
      this.drawChart()
    })
  }

/*
* Draw google pie chart using categoryPieData in local storage.
* Remove the element before every draw to avoid drawing over itself.
* Called on resize and load of window to adjust chart size
*/
  drawChart() {
     // create google pie chart with categories data
    var data = new google.visualization.DataTable();
    data.addColumn('string', "Category");
    data.addColumn('number', "Count");
    data.addRows(JSON.parse(localStorage.getItem("categoryPieData")));
    var options = {
      is3D: true, 
      legend :"bottom"
    };
    var div = document.getElementById("chart_div");
    while (div != null && div.firstChild) {
      div.removeChild(div.firstChild);
    }
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }

  render() {
    return (
      <div>
      <div className="container">
        <div className ="row">
          <div className="card bg-light mb-3" id="total-card">
            <div className="card-body">
                <h5 className="card-title">You've completed a total of</h5>
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
                  {this.state.totalCompleted == 0 ? 
                    "None Completed"
                    :
                    <div id="chart_div"></div>
                  }
                </div>
            </div>
          </div>
          <div className = "col-md-6">
            <div className="analytics-card">
                <div className="card-body">
                    <h5 className="card-title">History of Completed</h5>
                    {this.state.totalCompleted == 0 ? 
                      "None Completed"
                      :
                      <div>
                        { this.state.completed_challenges.map(function(challenge, i) {
                          return <p className="challenge-history" key={i}> {challenge.date_completed.toDate().getMonth()}/{challenge.date_completed.toDate().getDate()}/{challenge.date_completed.toDate().getFullYear()}  {challenge.challenges} </p>
                        })}
                      </div>          
                    }      
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default withRouter(Analytics);