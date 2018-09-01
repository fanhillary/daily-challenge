import React, { Component } from 'react';
import "./Analytics.css";
import firebase, { auth, db } from '../firebase.js';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);

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

  componentWillMount() {
    this.fireBaseListener = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("logged in - analytics");
        this.setState({ user: user });
        console.log(this.state.user);
        this.getCompletedChallenges();
      } else {
        this.setState({ user: null });
        console.log("not logged in - analytics");
      }
    });
  }

  componentWillUnmount() {
    // cancel the listener
    this.fireBaseListener();
  }

  getCompletedChallenges() {
    var docRef = db.collection("users").doc(this.state.user.email);
    docRef.get().then((doc) => {
      var user_data = doc.data();
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

      for (let i in completed_challenges) {
        categoriesCompleted[completed_challenges[i].type]++;
      }
      for (var category in categoriesCompleted) {
        this.state.categoryPieData.push({name: category, value: categoriesCompleted[category]});
      }

      console.log(this.state.categoryPieData);
    });

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
      <div>
          <ResponsiveContainer width="100%" height="90%">
          <PieChart width={730} height={250}>
              <Pie data={this.state.categoryPieData} dataKey="CategoryPercentages" nameKey="Categories" cx="50%" cy="50%" outerRadius="80%" fill="#8884d8" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    );
  }
}

export default Analytics;