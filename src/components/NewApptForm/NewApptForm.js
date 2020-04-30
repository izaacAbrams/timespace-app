import React, { Component } from "react";
import "./NewApptForm.css";

class NewApptForm extends Component {
  state = {
    currentQuestion: 0,
    questions: {
      name: "What is your name?",
      email: "What is your email address?",
      time: "What time would you like to make the appointment for?",
      services: "What is the appointment for?",
      comments:
        "Would you like to add any special instructions or notes with the appointment?",
    },
    answers: {
      name: "",
      email: "",
      time: "",
      services: "",
      comments: "",
    },
    button: "Next",
  };

  handleQuestions() {
    let questionsArray = Object.values(this.state.questions);
    return questionsArray;
  }

  handleName(e) {
    this.setState({
      answers: {
        name: e.target.value,
      },
    });
  }

  handleNext(e) {
    // const questionTitle = Object.keys(this.state.questions)[
    //   this.state.currentQuestion
    // ];
    // if (questionTitle === "name" || questionTitle === "email") {
    //   this.setState({
    //     answers: {
    //       [questionTitle]: document.querySelector("input").value,
    //     },
    //   });
    // } else if (questionTitle === "time") {
    //   this.setState({
    //     [questionTitle]: document.querySelector("option").value,
    //   });
    // }
    Object.keys(this.state.questions).forEach((question) => {
      if (
        question !==
        Object.keys(this.state.questions)[this.state.currentQuestion]
      ) {
        return question;
      }
      // const questionAnswers =
      //   if()

      // let newState = {
      //   answers: {
      //     ...this.state.answers,
      //     [question]: document.querySelector("input").value,
      //   },
      // };
      console.log(this.state.answers);
    });

    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    });
    // document.querySelector("input").value === "";
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
  }

  handleInputs() {
    const questionTitle = Object.keys(this.state.questions)[
      this.state.currentQuestion
    ];

    if (questionTitle === "name") {
      return (
        <div className="NewApptForm__section">
          <label htmlFor="schedule_name">Name:</label>
          <input
            type="text"
            onChange={(e) => this.handleName(e)}
            name="schedule_name"
            placeholder="Joe Smith"
            required
          />
        </div>
      );
    } else if (questionTitle === "email") {
      return (
        <div className="NewApptForm__section">
          <label htmlFor="schedule-email">Email:</label>
          <input
            type="text"
            name="schedule-email"
            placeholder="joe.smith@example.com"
            required
          />
        </div>
      );
    } else if (questionTitle === "time") {
      return (
        <div className="NewApptForm__section">
          <label htmlFor="appt-time">Appointment time:</label>
          <select className="form-time input" required>
            <option>1:00</option>
            <option>2:00</option>
            <option>3:00</option>
            <option>4:00</option>
            <option>5:00</option>
            <option>6:00</option>
            <option>7:00</option>
            <option>8:00</option>
            <option>9:00</option>
            <option>10:00</option>
            <option>11:00</option>
            <option>12:00</option>
          </select>
          <select>
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>
      );
    } else if (questionTitle === "services") {
      return (
        <div className="NewApptForm__section">
          <label htmlFor="appt-type">Service:</label>
          <select className="form-appt-type input " required>
            <option>Message</option>
            <option>Spa stuff</option>
            <option>Cucumber eyes</option>
            <option>Hot towel</option>
            <option>Nails</option>
          </select>
        </div>
      );
    } else if (questionTitle === "comments") {
      return (
        <div className="NewApptForm__section">
          <label htmlFor="notes">Comments:</label>
          <textarea
            className="input"
            name="notes"
            placeholder="Any extra notes for the staff?"
          ></textarea>
        </div>
      );
    }
  }
  render() {
    const configButtons =
      this.handleQuestions()[this.state.currentQuestion + 1] !== undefined ? (
        <button onClick={(e) => this.handleNext(e)}>Next</button>
      ) : (
        <button type="submit" onClick={(e) => this.handleSubmit(e)}>
          Submit
        </button>
      );

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
            <h1>Sally's Salon & Spa</h1>

            <h2>{this.handleQuestions()[this.state.currentQuestion]}</h2>
            {this.handleInputs()}
            {configButtons}
          </form>
        </main>
      </div>
    );
  }
}

export default NewApptForm;
