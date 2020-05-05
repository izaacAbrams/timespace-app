import React, { Component } from "react";
import moment from "moment";
import ScheduleContext from "../../contexts/ScheduleContext";
import "./EditScheduleForm.css";

export default class EditScheduleForm extends Component {
  static contextType = ScheduleContext;
  state = {
    schedule: "",
    time_open: "",
    time_closed: "",
  };
  renderHours() {
    let scheduleHours = [];
    for (let i = 100; i <= 2400; i += 100) {
      scheduleHours.push(moment(i, "Hmm").format("h:mm a"));
    }
    return scheduleHours;
  }
  currentSchedule() {
    return this.context.scheduleList.find(
      (schedule) => schedule.id === this.props.id
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    const currentIndex = this.context.scheduleList.findIndex(
      (schedule) => schedule.id === this.currentSchedule().id
    );
    if (this.state.time_open === "") {
      this.setState({
        time_open: this.currentSchedule().time_open,
      });
    }
    if (this.state.time_closed === "") {
      this.setState({
        time_closed: this.currentSchedule().time_closed,
      });
    }
    if (this.state.schedule === "") {
      this.setState({
        schedule: this.currentSchedule().schedule,
      });
    } else {
      this.context.scheduleList[currentIndex] = {
        ...this.context.scheduleList[currentIndex],
        schedule: this.state.schedule,
        time_open: this.state.time_open,
        time_closed: this.state.time_closed,
      };
    }
    this.props.push("/schedules");
    this.context.modal = false;
    document.querySelector(".modal").style.display = "none";
  }
  componentDidMount() {
    if (this.currentSchedule() !== undefined) {
      this.setState({
        schedule: this.currentSchedule().schedule,
        time_open: this.currentSchedule().time_open,
        time_closed: this.currentSchedule().time_closed,
      });
    }
  }
  handleName(e) {
    this.setState({
      schedule: e.target.value,
    });
  }
  handleTimeClosed(e) {
    const time_closed = moment(e.target.value, "h:mm a").format("HHmm");
    this.setState({ time_closed });
  }

  handleTimeOpen(e) {
    const time_open = moment(e.target.value, "h:mm a").format("HHmm");
    this.setState({ time_open });
  }
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <h3>Edit Schedule</h3>
        <label htmlFor="schedule_name">Name:</label>
        <input
          type="text"
          onChange={(e) => this.handleName(e)}
          name="schedule_name"
        />
        <div className="EditSchedule__section">
          <label htmlFor="hour_open">Time Open:</label>
          <select
            className="EditSchedule__hours"
            onClick={(e) => this.handleTimeOpen(e)}
            name="hour_open"
            required
          >
            {this.renderHours().map((hour) => (
              <option key={hour}>{hour}</option>
            ))}
          </select>
        </div>
        <div className="EditSchedule__section">
          <label htmlFor="hour_open">Time Closed:</label>
          <select
            className="EditSchedule__hours"
            onClick={(e) => this.handleTimeClosed(e)}
            name="hour_closed"
            required
          >
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
