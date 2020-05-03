import React, { Component } from "react";
import "./NewApptForm.css";
import ScheduleContext from "../../contexts/ScheduleContext";
import ApptContext from "../../contexts/ApptContext";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

class NewApptForm extends Component {
  static contextType = ApptContext;

  state = {
    id: uuidv4(),
    appt_date_time: moment().format(),
    name: "",
    email: "",
    service: "",
    notes: "",
    schedule: this.props.match.params.name,
    questions: {
      name: "What is your name?",
      email: "What is your email address?",
      date: "When would you like to make the appointment for?",
      time: "What time would you like the appointment?",
      service: "What is the appointment for?",
      notes: "Do you have any special requests?",
    },
  };

  handleSubmit(e) {
    const {
      id,
      appt_date_time,
      name,
      email,
      service,
      notes,
      schedule,
    } = this.state;
    e.preventDefault();
    const newAppt = {
      id,
      appt_date_time,
      name,
      email,
      service,
      notes,
      schedule,
    };
    this.context.apptList.push(newAppt);
  }

  handleSchedule(scheduleContext) {
    return scheduleContext.find(
      (schedule) => schedule.id === this.props.match.params.name
    );
  }

  handleApptTimes(scheduleContext) {
    const takenTimes = this.context.apptList.map((appt) => {
      if (this.handleSchedule(scheduleContext).id === appt.schedule) {
        return appt.appt_date_time;
      }
    });
    console.log(takenTimes);
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

  handleDate(e) {
    const apptDate = e.target.value;

    this.setState({
      appt_date_time: apptDate,
    });
  }

  handleName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  handleService(e) {
    this.setState({
      service: e.target.value,
    });
  }
  handleNotes(e) {
    this.setState({
      notes: e.target.value,
    });
  }
  handleTime(e) {
    const apptTime = moment(
      `${this.state.appt_date_time} ${e.target.value}`,
      "YYYY-MM-DD HH:mm a"
    ).format();

    this.setState({
      appt_date_time: apptTime,
    });
  }

  render() {
    // const newDate = moment(`2020-05-01`)
    //   .set("hour", "3")
    //   .set("minutes", "30")
    //   .format();
    // this.handleApptTimes();
    // console.log(this.handleSchedule());
    return (
      <div className="NewApptForm">
        <header>
          <h1 className="NewApptForm__title">Schedule an appointment</h1>
        </header>
        {/* {(context) => console.log(context.scheduleList)} */}
        <main className="NewApptForm__main">
          <form
            id="new-appointment"
            onSubmit={(e) => this.handleSubmit(e)}
            className="NewApptForm__form"
          >
            <ScheduleContext.Consumer>
              {(scheduleContext) => (
                <h1>
                  {this.handleSchedule(scheduleContext.scheduleList).schedule}
                  {/* {console.log(scheduleContext)} */}
                </h1>
              )}
            </ScheduleContext.Consumer>
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
                onChange={(e) => this.handleEmail(e)}
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
              <label htmlFor="schedule_time">Appointment time:</label>
              <select
                className="form-time"
                name="schedule_time"
                onChange={(e) => this.handleTime(e)}
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
            <div className="NewApptForm__section">
              <label htmlFor="schedule_services">Service:</label>
              <select
                className="form-appt-type"
                name="schedule_services"
                onChange={(e) => this.handleService(e)}
                required
              >
                <ScheduleContext.Consumer>
                  {(scheduleContext) =>
                    this.handleSchedule(
                      scheduleContext.scheduleList
                    ).services.map((service) => {
                      console.log(service);
                      return <option key={service.name}>{service.name}</option>;
                    })
                  }
                </ScheduleContext.Consumer>
              </select>
            </div>
            <div className="NewApptForm__section">
              <label htmlFor="notes">Comments:</label>
              <textarea
                name="notes"
                onChange={(e) => this.handleNotes(e)}
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
