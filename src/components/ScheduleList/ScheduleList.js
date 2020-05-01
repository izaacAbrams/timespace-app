import React, { Component } from "react";
import "./ScheduleList.css";

export default class ScheduleList extends Component {
  handleScheduleClick() {
    this.props.push("/schedules/" + this.props.id);
  }
  render() {
    return (
      <div
        onClick={() => this.handleScheduleClick()}
        className="Schedules__section"
      >
        <h2>{this.props.name}</h2>
        <div className="Schedules__buttons">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    );
  }
}
