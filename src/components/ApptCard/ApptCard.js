import React, { Component } from "react";
import moment from "moment";

export default class ApptCard extends Component {
  render() {
    const apptTime = moment(this.props.appt.appt_date_time).format("LT");
    return (
      <div className="Appointments__main_appt">
        <h3>{this.props.appt.name}</h3>
        <p>Service: {this.props.appt.service}</p>
        <p>Time: {apptTime}</p>
        <button onClick={() => this.props.handleEdit(this.props.appt.id)}>
          Edit
        </button>
        <button onClick={() => this.props.handleDelete(this.props.appt.id)}>
          Delete
        </button>
      </div>
    );
  }
}
