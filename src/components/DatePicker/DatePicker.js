import React, { Component } from "react";
import moment from "moment";
import TimespaceContext from "../../contexts/TimespaceContext";
import "./DatePicker.css";

export default class DatePicker extends Component {
  static contextType = TimespaceContext;

  state = {
    currentWeek: 0,
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
  handleApptNotfications(date) {
    return this.context.apptList.find(
      (appt) =>
        moment(appt.appt_date_time).format("MMDD") ===
        moment(date).format("MMDD")
    );
  }
  render() {
    return (
      <div className="form-section date-picker-container">
        <button
          className="DatePicker__arrows"
          onClick={(e) => this.handlePrevious(e)}
        >
          &larr;
        </button>
        {this.handleDateCards().map((date) => {
          return (
            <div
              className={
                moment(this.props.selected).format("MMDD") ===
                moment(date).format("MMDD")
                  ? "date-card-container selected"
                  : "date-card-container"
              }
              onClick={(e) => this.handleSubmit(e)}
              key={date}
              id={date}
            >
              <div className="date-card-wrapper">
                <span className="date-card-date">
                  {moment(date).format("M/DD")}
                </span>

                {this.handleApptNotfications(date) ? (
                  <span className="date-card-bullet">&bull;</span>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
        <button
          className="DatePicker__arrows"
          onClick={(e) => this.handleNext(e)}
        >
          &rarr;
        </button>
      </div>
    );
  }
}
