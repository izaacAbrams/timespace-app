import React, { Component } from "react";
import "./NewApptForm.css";
import seedSchedules from "../../seedSchedules.json";
import seedAppts from "../../seedAppts.json";
import ApptContext from "../../contexts/ApptContext";
// import uuid from "uuid";
import moment from "moment";

class NewApptForm extends Component {
  static contextType = ApptContext;

  state = {
    date_time: "",
    name: "",
    email: "",
    service: "",
    comments: "",
  };

  handleSubmit(e) {
    e.preventDefault();
    const newAppt = {
      name: e.target.schedule_name.value,
      email: e.target.schedule_email.value,
      appt_date_time: e.target.schedule_time.value,
      service: e.target.schedule_services.value,
      notes: e.target.notes.value,
    };
    this.context.apptList.push(newAppt);
  }

  handleSchedule() {
    return seedSchedules.find(
      (schedule) => schedule.id === this.props.match.params.name
    );
  }

  handleApptTimes() {
    seedAppts.forEach((appts) => this.context.apptList.push(appts));
    // const timeOpen = new Date(
    //   moment(this.handleSchedule().time_open, "hhmm").format()
    // );
    // const timeClosed = new Date(
    //   moment(this.handleSchedule().time_closed, "hhmm").format()
    // );
    const takenTimes = this.context.apptList.map((appt) => appt.appt_date_time);
    let timeList = [];
    for (
      let i = parseInt(this.handleSchedule().time_open);
      i <= parseInt(this.handleSchedule().time_closed);
      i += parseInt(this.handleSchedule().services[0].duration)
    ) {
      timeList.push(moment(i, "hmm").format("HHmm"));
    }

    takenTimes.map(
      (time) =>
        (timeList = timeList.filter(
          (takenTime) => takenTime !== moment(time).format("hhmm")
        ))
    );
    return timeList;
  }

  handleDate(e) {
    const apptDate = e.target.value;
    this.setState({
      date_time: apptDate,
    });
  }

  handleName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleTime(e) {
    const apptTime = moment(
      `${this.state.date_time} ${e.target.value}`,
      "YYYY-MM-DD HH:mm a"
    ).format();

    this.setState({
      date_time: apptTime,
    });
  }

  render() {
    // const newDate = moment(`2020-05-01`)
    //   .set("hour", "3")
    //   .set("minutes", "30")
    //   .format();
    this.handleApptTimes();

    return (
      <div className="NewApptForm">
        <header>
          <h1 className="NewApptForm__title">Schedule an appointment</h1>
        </header>
        <main className="NewApptForm__main">
          <form
            id="new-appointment"
            onSubmit={(e) => this.handleSubmit(e)}
            className="NewApptForm__form"
          >
            <h1>{this.handleSchedule().schedule}</h1>

            <div className="NewApptForm__section">
              <label htmlFor="schedule_name">Name:</label>
              <input
                type="text"
                name="schedule_name"
                onChange={(e) => this.handleName(e)}
                placeholder="Joe Smith"
                required
              />
            </div>
            <div className="NewApptForm__section">
              <label htmlFor="schedule_email">Email:</label>
              <input
                type="text"
                name="schedule_email"
                placeholder="joe.smith@example.com"
                required
              />
            </div>
            <div className="NewApptForm__section">
              <label htmlFor="schedule_date">Date:</label>
              <input
                type="date"
                onChange={(e) => this.handleDate(e)}
                name="schedule_date"
                required
              />
            </div>
            <div className="NewApptForm__section">
              <label htmlFor="appt-time">Appointment time:</label>
              <select
                className="form-time"
                name="schedule_time"
                onChange={(e) => this.handleTime(e)}
                required
              >
                {this.handleApptTimes().map((time) => {
                  return (
                    <option key={time}>
                      {moment(time, "hhmm").format("LT")}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="NewApptForm__section">
              <label htmlFor="schedule_services">Service:</label>
              <select
                className="form-appt-type"
                name="schedule_services"
                required
              >
                <option>Message</option>
                <option>Spa stuff</option>
                <option>Cucumber eyes</option>
                <option>Hot towel</option>
                <option>Nails</option>
              </select>
            </div>
            <div className="NewApptForm__section">
              <label htmlFor="notes">Comments:</label>
              <textarea
                name="notes"
                placeholder="Any extra notes for the staff?"
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </main>
      </div>
    );
  }
}

export default NewApptForm;
