import React, { Component } from "react";
import moment from "moment";
import TimespaceContext from "../../contexts/TimespaceContext";

export default class EditApptForm extends Component {
  static contextType = TimespaceContext;
  state = {
    name: "",
    appt_date: "",
    appt_date_time: "",
    service: "",
    error: null,
  };

  takenTimes() {
    return this.context.apptTimesList
      .filter(
        () =>
          moment(this.context.selected_date.appt_date_time).format("L") ===
          moment(this.state.appt_date).format("L")
      )
      .map((appt) => appt.appt_date_time);
  }

  handleApptTimes() {
    let takenTimes = this.takenTimes();
    let timeList = [];
    let serviceDuration = this.context.currentSchedule.services.find(
      (service) => service.name === this.currentAppt().service
    );
    let i = parseInt(this.context.currentSchedule.time_open);
    timeList.push(moment(i, "Hmm").format("HHmm"));
    while (i < parseInt(this.context.currentSchedule.time_closed)) {
      i = moment(i, "Hmm")
        .add(((i * 3600 + serviceDuration.duration * 60) / 3600) % i, "hours")
        .format("HHmm");
      timeList.push(i);
    }

    takenTimes.map(
      (time) =>
        (timeList = timeList.filter(
          (takenTime) => takenTime !== moment(time).format("HHmm")
        ))
    );
    return timeList;
  }

  currentAppt() {
    return this.context.apptList.find((appt) => appt.id === this.props.id);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.name === "") {
      this.setState({
        name: this.currentAppt().name,
      });
    }
    if (this.state.email === "") {
      this.setState({
        emai: this.currentAppt().email,
      });
    }
    if (this.state.appt_date_time === "") {
      this.setState({
        appt_date_time: this.currentAppt().appt_date_time,
      });
      if (this.state.service === "") {
        this.setState({
          service: this.currentAppt().service,
        });
      }
    } else {
      const newAppt = {
        id: this.currentAppt().id,
        name: this.state.name,
        email: this.currentAppt().email,
        appt_date_time: this.state.appt_date_time,
        service: this.state.service,
        schedule: this.currentAppt().schedule,
      };
      this.context.patchAppt(this.currentAppt().id, newAppt);
    }
    this.context.modal = false;
    document.querySelector(".modal").style.display = "none";
  }

  componentDidMount() {
    if (this.currentAppt() !== undefined) {
      this.setState({
        name: this.currentAppt().name,
        appt_date_time: this.currentAppt().appt_date_time,
        service: this.currentAppt().service,
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      name: "",
      appt_date_time: "",
      service: "",
    });
  }
  handleName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  handleDate(e) {
    this.setState({
      appt_date: e.target.value,
    });
  }
  handleTime(e) {
    document.querySelector(".submit_btn").disabled = false;
    moment(
      `${this.state.appt_date} ${e.target.value}`,
      "YYYY-MM-DD H:mm P"
    ).format();
    this.setState({
      appt_date_time: moment(
        `${this.state.appt_date} ${e.target.value}`,
        "YYYY-MM-DD H:mm P"
      ).format(),
    });
    this.state.appt_date_time === "Invalid date"
      ? this.setState({
          error: "Please select valid date and time",
        })
      : this.setState({ error: null });
  }
  handleServices(e) {
    this.setState({
      service: e.target.value,
    });
  }

  render() {
    const renderError = this.state.error ? (
      <p>{this.state.error}</p>
    ) : (
      <React.Fragment />
    );
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <h3>Edit Appointment</h3>
        <label htmlFor="appt_name">Name:</label>
        <input
          type="text"
          onChange={(e) => this.handleName(e)}
          name="appt_name"
        />
        <div className="EditAppt__section">
          <label htmlFor="service">Service:</label>
          <select
            className="EditAppt__services"
            onChange={(e) => this.handleServices(e)}
            name="service"
          >
            {this.context.currentSchedule.services.map((service) => {
              return <option key={service.name}>{service.name}</option>;
            })}
          </select>
        </div>
        <div className="EditAppt__section">
          <label htmlFor="date">Date:</label>
          <input type="date" onChange={(e) => this.handleDate(e)} name="date" />
        </div>
        <div className="EditAppt__section">
          <label htmlFor="time">Time:</label>
          <select
            className="EditAppt__hours"
            onChange={(e) => this.handleTime(e)}
            name="time"
          >
            {this.handleApptTimes().map((time) => {
              return (
                <option key={time}>{moment(time, "hhmm").format("LT")}</option>
              );
            })}
          </select>
        </div>
        {renderError}
        <button type="submit" className="submit_btn" disabled={true}>
          Submit
        </button>
      </form>
    );
  }
}
