import React, { Component } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import ScheduleContext from "../../contexts/ScheduleContext";
import "./NewScheduleForm.css";

class NewScheduleForm extends Component {
  static contextType = ScheduleContext;
  state = {
    id: uuidv4(),
    schedule: "",
    time_open: "100",
    time_closed: "2400",
    services: "",
  };

  handleSubmit(e) {
    e.preventDefault();
    this.context.scheduleList.push({
      ...this.state,
    });
    this.props.history.push("/schedules");
  }
  renderHours() {
    let scheduleHours = [];
    for (let i = 100; i <= 2400; i += 100) {
      scheduleHours.push(moment(i, "Hmm").format("h:mm a"));
    }
    return scheduleHours;
  }

  handleName(e) {
    this.setState({
      schedule: e.target.value,
    });
  }

  handleTimeOpen(e) {
    let timeOpen = moment(e.target.value, "h:mm a").format("HHmm");

    this.setState({
      time_open: timeOpen,
    });
  }

  handleTimeClosed(e) {
    let timeClosed = moment(e.target.value, "h:mm a").format("HHmm");
    if (timeClosed === "0000") {
      timeClosed = "2400";
    }
    this.setState({
      time_closed: timeClosed,
    });
  }

  handleServices(e) {
    let servicesArray = e.target.value.split(",");
    console.log(servicesArray.map((service) => service.trim()));
    this.setState({
      services: e.target.value,
    });
  }
  render() {
    return (
      <div className="NewSchedule">
        <header>
          <h1>Create a Schedule</h1>
        </header>
        <section className="NewSchedule__main_section">
          <form id="new-schedule" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="NewSchedule__section">
              <label htmlFor="schedule-name">Schedule Name:</label>
              <input
                type="text"
                name="schedule-name"
                placeholder="Sally's Salon & Spa"
                onChange={(e) => this.handleName(e)}
                required
              />
            </div>
            <div className="NewSchedule__section">
              <label htmlFor="hour_open">Time Open:</label>
              <select
                className="NewSchedule__hours"
                name="hour_open"
                onChange={(e) => this.handleTimeOpen(e)}
                required
              >
                {this.renderHours().map((hour) => (
                  <option key={hour}>{hour}</option>
                ))}
              </select>
            </div>
            <div className="NewSchedule__section">
              <label htmlFor="hour_closed">Time Closed:</label>
              <select
                className="NewSchedule__hours"
                name="hour_closed"
                onChange={(e) => this.handleTimeClosed(e)}
                required
              >
                {this.renderHours().map((hour) => (
                  <option key={hour}>{hour}</option>
                ))}
              </select>
            </div>
            <div className="NewSchedule__section">
              <label htmlFor="services">Services:</label>
              <input
                type="text"
                onChange={(e) => this.handleServices(e)}
                name="services"
              />
              <p className="NewSchedule__services_p">
                (If multiple, separate with comma)
              </p>
            </div>

            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    );
  }
}

export default NewScheduleForm;
