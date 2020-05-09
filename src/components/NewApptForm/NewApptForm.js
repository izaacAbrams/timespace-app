import React, { Component } from "react";
import ScheduleContext from "../../contexts/ScheduleContext";
import ApptContext from "../../contexts/ApptContext";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import "./NewApptForm.css";

class NewApptForm extends Component {
  static contextType = ApptContext;

  state = {
    id: uuidv4(),
    appt_date: "",
    appt_date_time: moment().format(),
    name: "",
    email: "",
    service: "",
    notes: "",
    schedule: this.props.match.params.name,
    currentQuestion: 0,
    questions: {
      name: "What is your name?",
      email: "What is your email address?",
      service: "What is the appointment for?",
      date: "When would you like to make the appointment for?",
      time: "What time would you like the appointment?",

      notes: "Do you have any special requests?",
    },
    error_name: false,
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
    this.setState({
      ...this.state,
      id: uuidv4(),
      appt_date_time: moment().format(),
      name: "",
      email: "",
      service: "",
      notes: "",
      schedule: this.props.match.params.name,
    });
    this.props.history.push('/success')
  }

  handleSchedule(scheduleContext) {
    return scheduleContext.find(
      (schedule) => schedule.id === this.props.match.params.name
    );
  }

  takenTimes(schedule) {
    const currentSchedule = this.handleSchedule(schedule);

    return this.context.apptList
      .filter(
        (appt) =>
          currentSchedule.id === appt.schedule &&
          moment(currentSchedule.appt_date_time).format("L") ===
            moment(this.state.appt_date).format("L")
      )
      .map((appt) => appt.appt_date_time);
  }

  handleApptTimes(scheduleContext) {
    let takenTimes = this.takenTimes(scheduleContext);
    console.log(moment().format());
    let timeList = [];
    let serviceDuration = this.handleSchedule(scheduleContext).services.find(
      (service) => service.name === this.state.service
    );
    let i = parseInt(this.handleSchedule(scheduleContext).time_open);
    timeList.push(moment(i, "Hmm").format("HHmm"));
    while (i < parseInt(this.handleSchedule(scheduleContext).time_closed)) {
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

  handleServices(scheduleContext) {
    const services = this.handleSchedule(scheduleContext.scheduleList).services;
    return typeof services === "string" ? (
      <option key={services}>{services}</option>
    ) : (
      services.map((service) => {
        return <option key={service.name}>{service.name}</option>;
      })
    );
  }
  handleDate(e) {
    const apptDate = e.target.value;
    this.setState({
      appt_date: apptDate,
    });
  }

  handleChange = (e) => {
    //   e.preventDefault()
    //   const {name, value} = e.target
    //   let errors = this.state.errors

    // switch(name) {
    //   case 'name':
    //     errors.name =
    //     value.trim().length < 1
    //     ? 'Please enter your name'
    //     : false

    //     break;
    if (this.state.error === true) {
      document.querySelector(".NewAppt_btn").disabled = true;
    }
  };

  // }
  handleName(e) {
    // console.log(e.target)
    if (e.target.value.trim().length < 2) {
      //   console.log(e.target)
      this.setState({
        error_name: true,
      });

      //     : this.setState({
      //         error_name: false,
      //       });
    }
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
    const currentButton = document.getElementById(`${e.target.id}`);
    document
      .querySelector(".form-time")
      .childNodes.forEach((time) => time.classList.remove("selected"));
    currentButton.classList.toggle("selected");

    const apptTime = moment(
      `${this.state.appt_date} ${e.target.innerHTML}`,
      "YYYY-MM-DD HH:mm a"
    ).format();

    this.setState({
      appt_date_time: apptTime,
    });
  }

  handleNext(e) {
    e.preventDefault();

    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    });
  }

  handleBack(e) {
    e.preventDefault();
    this.setState({
      currentQuestion: this.state.currentQuestion - 1,
    });
  }
  renderQuestions() {
    const questions = Object.values(this.state.questions);
    return (
      <h2 key={this.state.currentQuestion}>
        {questions[this.state.currentQuestion]}
      </h2>
    );
  }

  renderButtons() {
    const currentQuestion = Object.keys(this.state.questions)[
      this.state.currentQuestion + 1
    ];
    const backButton =
      this.state.currentQuestion !== 0 ? (
        <button onClick={(e) => this.handleBack(e)}>Back</button>
      ) : (
        <React.Fragment />
      );
    return currentQuestion !== undefined ? (
      <div className="NewAppt__buttons">
        {backButton}
        <button className="NewAppt__btn" onClick={(e) => this.handleNext(e)}>
          Next
        </button>
      </div>
    ) : (
      <div className="NewAppt__buttons">
        {backButton}
        <button type="submit">Submit</button>
      </div>
    );
  }
  renderInputs() {
    const currentIndex = Object.keys(this.state.questions)[
      this.state.currentQuestion
    ];
    if (currentIndex === "name") {
      return (
        <div className="NewApptForm__section">
          <label htmlFor="schedule_name">Name:</label>
          <input
            type="text"
            name="schedule_name"
            value={this.state.name}
            onChange={(e) => this.handleName(e)}
            placeholder="Joe Smith"
            required
          />
          {this.state.error_name ? (
            <p>Please enter your name</p>
          ) : (
            <React.Fragment />
          )}
        </div>
      );
    } else if (currentIndex === "email") {
      return (
        <div className="NewApptForm__section">
          <label htmlFor="schedule_email">Email:</label>
          <input
            type="text"
            value={this.state.email}
            onChange={(e) => this.handleEmail(e)}
            name="schedule_email"
            placeholder="joe.smith@example.com"
            required
          />
        </div>
      );
    } else if (currentIndex === "date") {
      return (
        <div className="NewApptForm__section">
          <label htmlFor="schedule_date">Date:</label>
          <input
            type="date"
            value={this.state.appt_date}
            onChange={(e) => this.handleDate(e)}
            name="schedule_date"
            required
          />
        </div>
      );
    } else if (currentIndex === "time") {
      return (
        <div className="NewApptForm__section">
          <label htmlFor="schedule_time">Appointment time:</label>
          <div className="form-time" name="schedule_time" required>
            <ScheduleContext.Consumer>
              {(scheduleContext) =>
                this.handleApptTimes(scheduleContext.scheduleList).map(
                  (time) => {
                    return (
                      <div
                        className="time-blocks"
                        key={time}
                        id={time}
                        onClick={(e) => this.handleTime(e)}
                      >
                        <p key={time} id={time} className="time-list">
                          {moment(time, "hhmm").format("LT")}
                        </p>
                      </div>
                    );
                  }
                )
              }
            </ScheduleContext.Consumer>
          </div>
        </div>
      );
    } else if (currentIndex === "service") {
      return (
        <div className="NewApptForm__section">
          <label htmlFor="schedule_services">Service:</label>
          <select
            className="form-appt-type"
            name="schedule_services"
            onClick={(e) => this.handleService(e)}
            required
          >
            <ScheduleContext.Consumer>
              {(scheduleContext) => this.handleServices(scheduleContext)}
            </ScheduleContext.Consumer>
          </select>
        </div>
      );
    } else if (currentIndex === "notes") {
      return (
        <div className="NewApptForm__section">
          <label htmlFor="notes">Comments:</label>
          <textarea
            name="notes"
            value={this.state.notes}
            onChange={(e) => this.handleNotes(e)}
            placeholder="Any extra notes for the staff?"
          ></textarea>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="NewApptForm">
        {/* <header>
          <h1 className="NewApptForm__title">Schedule an appointment</h1>
        </header> */}
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
                </h1>
              )}
            </ScheduleContext.Consumer>
            {this.renderQuestions()}
            {this.renderInputs()}
            {this.renderButtons()}
          </form>
        </main>
      </div>
    );
  }
}

export default NewApptForm;
