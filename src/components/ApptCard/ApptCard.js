import React, { Component } from "react";

export default class ApptCard extends Component {
  render() {
    return (
      <div className="Appointments__main_appt">
        <h3>{this.props.name}</h3>
        <p>Service: {this.props.service}</p>
        <p>
          Time: {this.props.time} - {parseInt(this.props.time) + 1}
        </p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    );
  }
}
