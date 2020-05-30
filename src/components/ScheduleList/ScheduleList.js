import React, { Component } from "react";
import { Link } from "react-router-dom";
import TimespaceContext from "../../contexts/TimespaceContext";
import "./ScheduleList.css";

export default class ScheduleList extends Component {
  static contextType = TimespaceContext;

  render() {
    return (
      <div className="Schedules__section">
        <Link
          className="schedule_title"
          to={`/schedules/${this.props.schedule.schedule_url}`}
        >
          {this.props.schedule.schedule}
        </Link>
        <div className="Schedules__buttons">
          <button
            className="Schedule__btn"
            onClick={() => this.props.handleEdit(this.props.schedule.id)}
          >
            Edit
          </button>
          <button
            className="Schedule__btn"
            onClick={() => this.props.handleDelete(this.props.schedule.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
