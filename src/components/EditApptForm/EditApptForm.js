import React, { Component } from "react";
import moment from "moment";
import ApptContext from "../../contexts/ApptContext";
import ScheduleContext from "../../contexts/ScheduleContext";

export default class EditApptForm extends Component {
  static contextType = ApptContext;
  state = {
    name: "",
    email: "",
    appt_date: "",
    appt_date_time: "",
    service: "",
  };

  handleSchedule(scheduleContext) {
    return scheduleContext.find(
      (schedule) => schedule.id === this.props.match.params.id
    );
  }

  takenTimes(schedule) {
    const currentSchedule = this.handleSchedule(schedule);
    return this.context.apptList
      .filter((appt) => currentSchedule.id === appt.schedule)
      .map((appt) => appt.appt_date_time);
  }

  handleApptTimes(scheduleContext) {
    let takenTimes = this.takenTimes(scheduleContext);
    let timeList = [];

    for (
      let i = parseInt(this.handleSchedule(scheduleContext).time_open);
      i <= parseInt(this.handleSchedule(scheduleContext).time_closed);
      i += 100
    ) {
      timeList.push(moment(i, "hmm").format("HHmm"));
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
    const currentIndex = this.context.apptList.findIndex(
      (appt) => appt.id === this.currentAppt().id
    );
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
      this.context.apptList[currentIndex] = {
        ...this.context.apptList[currentIndex],
        name: this.state.name,
        email: this.state.email,
        appt_date_time: this.state.appt_date_time,
        service: this.state.service,
      };
    }
    this.props.history.push(`/schedules/${this.currentAppt().schedule}`);
    this.context.modal = false;
    document.querySelector(".modal").style.display = "none";
  }

  componentDidMount() {
    if (this.currentAppt() !== undefined) {
      this.setState({
        name: this.currentAppt().name,
        email: this.currentAppt().email,
        appt_date_time: this.currentAppt().appt_date_time,
        service: this.currentAppt().service,
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      name: "",
      email: "",
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
    console.log(this.state.appt_date, e.target.value);
    this.setState({
      appt_date_time: moment(
        `${this.state.appt_date} ${e.target.value}`,
        "YYYY-MM-DD H:mm P"
      ).format(),
    });
  }
  render() {
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
          <label htmlFor="date">Date:</label>
          <input type="date" onChange={(e) => this.handleDate(e)} name="date" />
        </div>
        <div className="EditAppt__section">
          <label htmlFor="hour_open">Time:</label>
          <select
            className="EditAppt__hours"
            onClick={(e) => this.handleTime(e)}
            name="hour_closed"
            required
          >
            <ScheduleContext.Consumer>
              {(scheduleContext) =>
                this.handleApptTimes(scheduleContext.scheduleList).map(
                  (time) => {
                    return (
                      <option key={time}>
                        {moment(time, "hhmm").format("LT")}
                      </option>
                    );
                  }
                )
              }
            </ScheduleContext.Consumer>
          </select>
        </div>
        <button type="submit" className="submit_btn" disabled={true}>
          Submit
        </button>
      </form>
    );
  }
}
