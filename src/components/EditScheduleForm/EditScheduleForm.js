import React, { Component } from "react";
import moment from "moment";
import TimespaceContext from "../../contexts/TimespaceContext";
import ServiceForm from "../ServiceForm/ServiceForm";
import "./EditScheduleForm.css";

export default class EditScheduleForm extends Component {
  static contextType = TimespaceContext;
  state = {
    schedule: "",
    schedule_url: "",
    time_open: "",
    time_closed: "",
    services: [],
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

    if (this.state.services.length === 0) {
      this.setState({
        services: this.currentSchedule().services,
      });
    } else {
      const newSchedule = {
        id: this.currentSchedule().id,
        user_id: this.currentSchedule().user_id,
        schedule: this.state.schedule,
        schedule_url: this.state.schedule_url,
        time_open: this.state.time_open,
        time_closed: this.state.time_closed,
        services: JSON.stringify(this.state.services),
      };
      this.context.patchSchedule(this.currentSchedule().id, newSchedule);
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
        schedule_url: this.currentSchedule().schedule_url,
      });
    }
  }
  handleName(e) {
    const urlName = e.target.value
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    this.setState({
      schedule: e.target.value,
      schedule_url: urlName,
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
  handleServicesSubmit(name, duration) {
    const serviceList = [...this.state.services, { name, duration }];
    this.setState({
      services: serviceList,
    });
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
        <ServiceForm
          handleServicesSubmit={(name, duration) =>
            this.handleServicesSubmit(name, duration)
          }
        />
        {this.state.services.map((service) => (
          <p key={service.name + service.duration}>
            {service.name}: {service.duration} mins
          </p>
        ))}
        <button type="submit">Submit</button>
      </form>
    );
  }
}
