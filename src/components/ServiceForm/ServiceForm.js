import React, { Component } from "react";

export default class ServiceForm extends Component {
  state = {
    name: "",
    duration: "15",
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
    return (
      <div className="ServiceForm__section">
        <h2>Add New Service</h2>
        <div className="ServiceForm__name">
          <label htmlFor="service">Service:</label>
          <input
            name="service"
            onChange={(e) => this.handleService(e)}
            type="text"
          />
        </div>
        <div className="ServiceForm__name">
          <label htmlFor="duration">Duration:</label>
          <select onClick={(e) => this.handleDuration(e)} name="duration">
            <option>15 min</option>
            <option>30 min</option>
            <option>60 min</option>
          </select>
        </div>
        <button className="add_btn" onClick={(e) => this.handleAdd(e)}>
          Add
        </button>
      </div>
    );
  }
}
