import React, { Component } from "react";
import moment from "moment";

export default class DatePicker extends Component {
  state = {
    current_date: moment().format(),
  };
  handleDate(e) {
    this.setState({
      current_date: moment(e.target.value).format(),
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleDateSubmit(this.state.current_date);
  }

  render() {
    return (
      <div className="form-section">
        <label htmlFor="schedule-date">Date:</label>
        <input
          type="date"
          onChange={(e) => this.handleDate(e)}
          name="schedule-date"
          required
        />
        <button onClick={(e) => this.handleSubmit(e)} type="submit">
          Submit
        </button>
      </div>
    );
  }
}
