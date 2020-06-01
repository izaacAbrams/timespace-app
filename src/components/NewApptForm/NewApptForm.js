import React, { Component } from "react";
import TimespaceContext from "../../contexts/TimespaceContext";
import ApptApiService from "../../services/appt-api-service";
import moment from "moment";
import "./NewApptForm.css";

class NewApptForm extends Component {
  static contextType = TimespaceContext;

  state = {
    appt_date: "",
    appt_date_time: moment().format(),
    name: "",
    email: "",
    service: "",
    notes: "",
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
    const { appt_date_time, name, email, service, notes } = this.state;
    e.preventDefault();
    const newAppt = {
      appt_date_time,
      name,
      email,
      service,
      notes,
      id: "",
      schedule: this.context.currentSchedule.id,
    };
    this.context.addAppt(newAppt);
    this.setState({
      appt_date_time: moment().format(),
      name: "",
      email: "",
      service: "",
      notes: "",
      schedule: this.props.match.params.name,
    });
    this.props.history.push("/success");
  }

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
      (service) => service.name === this.state.service
    );
    let i = parseInt(this.context.currentSchedule.time_open);
    timeList.push(moment(i, "Hmm").format("HHmm"));
    // iterates through open/closed times at the duration of the service
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

  handleServices() {
    const services = this.context.currentSchedule.services;
    return typeof services === "string" ? (
      <option key={services}>{services}</option>
    ) : (
      services.map((service) => {
        return <option key={service.name}>{service.name}</option>;
      })
    );
  }
  handleDate(e) {
    document.getElementById("next_btn").classList.remove("disabled");
    const apptDate = e.target.value;
    this.setState({
      appt_date: apptDate,
    });
  }

  handleName(e) {
    if (e.target.value.trim().length > 2) {
      document.getElementById("next_btn").classList.remove("disabled");
    } else {
      document.getElementById("next_btn").classList.add("disabled");
    }
    this.setState({
      name: e.target.value,
    });
  }

  handleEmail(e) {
    if (
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(e.target.value)
    ) {
      document.getElementById("next_btn").classList.remove("disabled");
    } else {
      document.getElementById("next_btn").classList.add("disabled");
    }

    this.setState({
      email: e.target.value,
    });
  }
  handleService(e) {
    if (this.state.service !== "") {
      document.getElementById("next_btn").classList.remove("disabled");
    } else {
      document.getElementById("next_btn").classList.add("disabled");
    }
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
    document.getElementById("next_btn").classList.remove("disabled");
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
    document.getElementById("next_btn").classList.add("disabled");
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

  componentDidMount() {
    ApptApiService.getScheduleId(this.props.match.params.name).then(
      (schedule) => {
        this.context.addCurrentSchedule(schedule);
        this.context.addApptTimesList(schedule.id);
      }
    );
  }
  renderQuestions() {
    const questions = Object.values(this.state.questions);
    return (
      <h2 className="NewApptForm__question" key={this.state.currentQuestion}>
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
        <div
          className="NewApptForm__btn back"
          onClick={(e) => this.handleBack(e)}
        >
          Back
        </div>
      ) : (
        <React.Fragment />
      );
    return currentQuestion !== undefined ? (
      <div className="NewApptForm__buttons">
        {backButton}
        <button
          className="NewApptForm__btn disabled"
          id="next_btn"
          onClick={(e) => this.handleNext(e)}
        >
          Next
        </button>
      </div>
    ) : (
      <div>
        {backButton}
        <button className="NewApptForm__btn" type="submit">
          Submit
        </button>
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
          <label
            className="input_label NewApptForm__label"
            htmlFor="schedule_name"
          >
            Full Name:
          </label>
          <input
            type="text"
            name="schedule_name"
            className="NewApptForm__input"
            value={this.state.name}
            onChange={(e) => this.handleName(e)}
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
          <label
            className="input_label NewApptForm__label"
            htmlFor="schedule_email"
          >
            Email:
          </label>
          <input
            type="text"
            className="NewApptForm__input"
            value={this.state.email}
            onChange={(e) => this.handleEmail(e)}
            name="schedule_email"
            required
          />
        </div>
      );
    } else if (currentIndex === "date") {
      return (
        <div className="NewApptForm__section">
          <label
            className="input_label NewApptForm__label"
            htmlFor="schedule_date"
          >
            Date:
          </label>
          <input
            type="date"
            className="NewApptForm__input"
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
          <label
            className="input_label NewApptForm__label"
            htmlFor="schedule_time"
          >
            Appointment time:
          </label>
          <div className="form-time" name="schedule_time" required>
            {this.handleApptTimes().map((time) => {
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
            })}
          </div>
        </div>
      );
    } else if (currentIndex === "service") {
      return (
        <div className="NewApptForm__section">
          <label
            className="input_label NewApptForm__label"
            htmlFor="schedule_services"
          >
            Service:
          </label>
          <select
            className="form-appt-type"
            name="schedule_services"
            onClick={(e) => this.handleService(e)}
            required
          >
            {this.handleServices()}
          </select>
        </div>
      );
    } else if (currentIndex === "notes") {
      return (
        <div className="NewApptForm__section">
          <label className="input_label NewApptForm__label" htmlFor="notes">
            Comments:
          </label>
          <textarea
            name="notes"
            value={this.state.notes}
            className="NewApptForm__text"
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
        <main className="NewApptForm__main">
          <form
            id="new-appointment"
            onSubmit={(e) => this.handleSubmit(e)}
            className="NewApptForm__form"
          >
            <h1 className="NewApptForm__title">
              {this.context.currentSchedule.schedule}
            </h1>

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
