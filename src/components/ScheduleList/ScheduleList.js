import React, { Component } from "react";
import "./ScheduleList.css";

export default class ScheduleList extends Component {
  handleScheduleClick() {
    this.props.push("/schedules/" + this.props.url);
  }

  render() {
    return (
      <div className="Schedules__section">
        <h2 onClick={() => this.handleScheduleClick()}>{this.props.name}</h2>
        <div className="Schedules__buttons">
          <button onClick={() => this.props.handleEdit(this.props.id)}>
            Edit
          </button>
          <button onClick={() => this.props.handleDelete(this.props.id)}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}
