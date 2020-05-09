import React, { Component } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import ServiceForm from "../../components/ServiceForm/ServiceForm";
import ScheduleContext from "../../contexts/ScheduleContext";
import "./NewScheduleForm.css";

class NewScheduleForm extends Component {
  static contextType = ScheduleContext;
  state = {
    id: uuidv4(),
    schedule: "",
    time_open: "100",
    time_closed: "2300",
    services: [],
  };

  handleSubmit(e) {
    e.preventDefault();
    this.context.scheduleList.push({
      ...this.state,
    });
    this.props.history.push("/schedules");
  }
  renderHours() {
    let scheduleHours = [];
    for (let i = 100; i <= 2400; i += 100) {
      scheduleHours.push(moment(i, "Hmm").format("h:mm a"));
    }
    return scheduleHours;
  }

  renderServices() {
    if (this.state.services.length === 0) {
      return <React.Fragment />;
    } else if (this.state.services.length === 1) {
      return (
        <p>
          {this.state.services[0].name} - {this.state.services[0].duration} mins
        </p>
      );
    } else {
      return this.state.services.map((service) => {
        return (
          <p key={service.name + service.duration}>
            {service.name} - {service.duration} mins
          </p>
        );
      });
    }
  }
  handleName(e) {
    const urlName = e.target.value
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    this.setState({
      schedule: e.target.value,
      schedule_url: urlName,
    });
  }

  handleTimeOpen(e) {
    let timeOpen = moment(e.target.value, "h:mm a").format("HHmm");

    this.setState({
      time_open: timeOpen,
    });
  }

  handleTimeClosed(e) {
    let timeClosed = moment(e.target.value, "h:mm a").format("HHmm");
    if (timeClosed === "0000") {
      timeClosed = "2300";
    }
    this.setState({
      time_closed: timeClosed,
    });
  }

  handleServicesModal(e) {
    e.preventDefault();
    this.context.services_modal = true;
    document.querySelector(".modal").style.display = "block";
    this.props.history.push("/new-schedule");
  }

  handleServicesSubmit(name, duration) {
    const addService = {
      name,
      duration,
    };
    this.state.services.push(addService);
    this.context.services_modal = false;
    this.props.history.push("/new-schedule");
    if (this.state.schedule !== "") {
      document.querySelector(".submit-btn").disabled = false;
    }
  }
  handleClose(e) {
    if (
      e.target === document.querySelector(".modal-close") ||
      e.target === document.querySelector(".modal") ||
      e.target === document.querySelector(".add_btn")
    ) {
      document.querySelector(".modal").style.display = "none";
      this.props.history.push(`/new-schedule`);
      this.context.modal = false;
    } else {
      document.querySelector(".modal").style.display = "block";
    }
  }

  render() {
    const renderServiceModal =
      this.context.services_modal === true ? (
        <ServiceForm
          header="Add New Service"
          handleServicesSubmit={(services, duration) =>
            this.handleServicesSubmit(services, duration)
          }
        />
      ) : (
        <React.Fragment />
      );
    return (
      <div className="NewSchedule">
        <header>
          <h1>Create a Schedule</h1>
        </header>
        <section className="NewSchedule__main_section">
          <form id="new-schedule" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="NewSchedule__section">
              <label htmlFor="schedule-name">Schedule Name:</label>
              <input
                type="text"
                name="schedule-name"
                placeholder="Sally's Salon & Spa"
                onChange={(e) => this.handleName(e)}
                required
              />
            </div>
            <div className="NewSchedule__section">
              <label htmlFor="hour_open">Time Open:</label>
              <select
                className="NewSchedule__hours"
                name="hour_open"
                onChange={(e) => this.handleTimeOpen(e)}
                required
              >
                {this.renderHours().map((hour) => (
                  <option key={hour}>{hour}</option>
                ))}
              </select>
            </div>
            <div className="NewSchedule__section">
              <label htmlFor="hour_closed">Time Closed:</label>
              <select
                className="NewSchedule__hours"
                name="hour_closed"
                onChange={(e) => this.handleTimeClosed(e)}
                required
              >
                {this.renderHours().map((hour) => (
                  <option key={hour}>{hour}</option>
                ))}
              </select>
            </div>
            <div className="NewSchedule__section">
              <label htmlFor="services">Services:</label>
              {this.renderServices()}
              <button onClick={(e) => this.handleServicesModal(e)}>New</button>
              <div className="modal" onClick={(e) => this.handleClose(e)}>
                <div className="display-modal">
                  <p className="modal-close">x</p>
                  {renderServiceModal}
                </div>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={true}>
              Submit
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default NewScheduleForm;
