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
        <button onClick={() => this.props.handleEdit(this.props.id)}>
          Edit
        </button>
        <button onClick={() => this.props.handleDelete(this.props.id)}>
          Delete
        </button>
      </div>
    );
  }
}
