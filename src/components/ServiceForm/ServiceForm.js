import React, { Component } from "react";

export default class ServiceForm extends Component {
  state = {
    name: "",
    duration: "15",
    error: null,
  };
  handleAdd(e) {
    e.preventDefault();
    this.props.handleServicesSubmit(this.state.name, this.state.duration);
  }
  handleService(e) {
    this.setState({
      name: e.target.value,
    });
  }
  handleDuration(e) {
    this.setState({
      duration: e.target.value.split(" ")[0],
    });
  }
  render() {
    const error = this.state.error ? (
      <p className="red">{this.state.error}</p>
    ) : (
      <React.Fragment />
    );
    return (
      <div className="ServiceForm__section">
        {this.props.header ? (
          <h2 className="ServiceForm__title">{this.props.header}</h2>
        ) : (
          <></>
        )}
        <div className="ServiceForm__name">
          <label
            className="input_label ServiceForm__label"
            htmlFor="serviceform_service"
          >
            Service:
          </label>
          <input
            name="service"
            id="serviceform_service"
            className="Edit__input"
            onChange={(e) => this.handleService(e)}
            type="text"
          />
        </div>
        <div className="ServiceForm__name">
          <label
            className="input_label ServiceForm__label"
            htmlFor="serviceform_duration"
          >
            Duration:
          </label>
          <select
            className="Edit__hours"
            id="serviceform_duration"
            onChange={(e) => this.handleDuration(e)}
            name="duration"
          >
            <option>15 min</option>
            <option>30 min</option>
            <option>60 min</option>
          </select>
        </div>
        {error}
        <button className="add_btn" onClick={(e) => this.handleAdd(e)}>
          Add Service
        </button>
      </div>
    );
  }
}
