import React, { Component } from "react";
import moment from "moment";

export default class DatePicker extends Component {
  state = {
    currentWeek: 0,
    dot: null,
  };
  handleSubmit(e) {
    this.props.handleDateSubmit(e.currentTarget.getAttribute("id"));
  }
  handleDateCards() {
    const week = [];
    for (let i = 0; i < 7; i++) {
      if (this.state.currentWeek !== 0) {
        let dates = moment().add(this.state.currentWeek, "weeks");
        const currentWeek = dates.add(i, "days").format();
        week.push(currentWeek);
      } else {
        let dates = moment();
        const currentWeek = dates.add(i, "days").format();
        week.push(currentWeek);
      }
    }
    return week;
  }

  handlePrevious(e) {
    e.preventDefault();
    this.setState({
      currentWeek: this.state.currentWeek - 1,
    });
  }

  handleNext(e) {
    e.preventDefault();
    this.setState({
      currentWeek: this.state.currentWeek + 1,
    });
  }
  render() {
    return (
      <div className="form-section">
        <button onClick={(e) => this.handlePrevious(e)}>Back</button>
        {this.handleDateCards().map((date) => {
          return (
            <div
              className="date-card-container"
              onClick={(e) => this.handleSubmit(e)}
              key={date}
              id={date}
            >
              <div className="date-card-wrapper">
                <span className="date-card-date">
                  {moment(date).format("M/DD")}
                </span>
              </div>
            </div>
          );
        })}
        <button onClick={(e) => this.handleNext(e)}>Next</button>
      </div>
    );
  }
}
