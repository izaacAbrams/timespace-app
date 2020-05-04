import React, { Component } from "react";
import moment from "moment";
import ScheduleContext from "../../contexts/ScheduleContext";
import "./EditScheduleForm.css";

export default class Edit extends Component {
  static contextType = ScheduleContext;
  state = {
    name: this.currentSchedule().schedule,
    time_open: this.currentSchedule.time_open,
    time_closed: this.currentSchedule.time_closed,
  };
  renderHours() {
    let scheduleHours = [];
    for (let i = 100; i <= 2400; i += 100) {
      scheduleHours.push(moment(i, "Hmm").format("h:mm a"));
    }
    return scheduleHours;
  }
  currentSchedule() {
    if (this.context.currentSchedule !== undefined) {
      return this.context.scheduleList.filter(
        (schedule) => schedule.id === this.context.currentSchedule
      );
    }
    console.log(this.context.currentSchedule);
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.context);
  }
  render() {
    console.log(this.currentSchedule());
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <h3>Edit Schedule</h3>
        <label htmlFor="schedule_name">Name:</label>
        <input type="text" name="schedule_name" />
        <div className="EditSchedule__section">
          <label htmlFor="hour_open">Time Open:</label>
          <select className="EditSchedule__hours" name="hour_open" required>
            {this.renderHours().map((hour) => (
              <option key={hour}>{hour}</option>
            ))}
          </select>
        </div>
        <div className="EditSchedule__section">
          <label htmlFor="hour_open">Time Closed:</label>
          <select className="EditSchedule__hours" name="hour_closed" required>
            {this.renderHours().map((hour) => (
              <option key={hour}>{hour}</option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
