import React, { Component } from "react";
import moment from "moment";

export default class ApptCard extends Component {
  render() {
    const apptTime = moment(this.props.appt).format("LT");
    return (
      <div className="Appointments__main_appt">
        <h3>{this.props.name}</h3>
        <p>Service: {this.props.service}</p>
        <p>Time: {apptTime}</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    );
  }
}
