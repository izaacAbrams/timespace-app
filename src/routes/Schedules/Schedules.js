import React, { Component } from "react";
import { Link } from "react-router-dom";
import ScheduleContext from "../../contexts/ScheduleContext";
import ScheduleList from "../../components/ScheduleList/ScheduleList";
import "./Schedules.css";

class Schedules extends Component {
  static contextType = ScheduleContext;

  render() {
    return (
      <div>
        <div className="Schedule__header">
          <h1>Your Schedules</h1>
          <Link to="/new-schedule">New</Link>
        </div>
        {this.context.scheduleList.map((schedule) => (
          <ScheduleList
            key={schedule.id}
            id={schedule.id}
            name={schedule.schedule}
            {...this.props.history}
          />
        ))}
      </div>
    );
  }
}

export default Schedules;
