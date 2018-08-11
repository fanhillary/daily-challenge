import React, { Component } from 'react';
import "./Analytics.css";

class Analytics extends Component {
  render() {
    return (
      <div className="container">
        <div className ="row">
          <div className="card bg-light mb-3" id="total-card">
            <div className="card-body">
                <h5 className="card-title">Total Challenges Completed</h5>
                <p className="card-text">You've conquered a total of</p>
                <p className="card-text">10</p>
                <p className="card-text">challenges</p>
            </div>
          </div>
        </div>
        <div className = "row">
          <div className = "col-md-4">
            <div className="analytics-card">
              <div className="card-body">
                  <h5 className="card-title">Calendar of Completed</h5>
                  <p className="card-text"> INSERT CALENDAR</p>
              </div>
            </div>
          </div>
          <div className = "col-md-4">
            <div className="analytics-card">
              <div className="card-body">
                  <h5 className="card-title">Categories Completed</h5>
                  <p className="card-text"> INSERT PIE CHART</p>
              </div>
            </div>
          </div>
          <div className = "col-md-4">
            <div className="analytics-card">
                <div className="card-body">
                    <h5 className="card-title">History of Completed</h5>
                    <p className="card-text"> List Completed</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Analytics;