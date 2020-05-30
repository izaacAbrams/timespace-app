import React, { Component } from "react";
import moment from "moment";
import ServiceForm from "../../components/ServiceForm/ServiceForm";
import TimespaceContext from "../../contexts/TimespaceContext";
import TokenService from "../../services/token-service";
import "./NewScheduleForm.css";

class NewScheduleForm extends Component {
  static contextType = TimespaceContext;
  state = {
    schedule: "",
    schedule_url: "",
    time_open: "100",
    time_closed: "2300",
    services: [],
  };

  handleSubmit(e) {
    e.preventDefault();
    const {
      schedule,
      time_open,
      time_closed,
      schedule_url,
      services,
    } = this.state;
    const newSchedule = {
      schedule,
      time_open,
      time_closed,
      schedule_url,
      services: JSON.stringify(services),
      user_id: TokenService.readJwtToken().user_id,
    };
    this.context.addSchedule(newSchedule);
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
        <p className="service_list">
          {this.state.services[0].name} - {this.state.services[0].duration} mins
        </p>
      );
    } else {
      return this.state.services.map((service) => {
        return (
          <p className="service_list" key={service.name + service.duration}>
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
      document.querySelector(".submit_btn").disabled = false;
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
          <h1 className="NewSchedule__title">Create a Schedule</h1>
        </header>
        <section className="NewSchedule__main_section">
          <form
            id="new-schedule"
            className="NewSchedule__form"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <div className="NewSchedule__section">
              <label
                htmlFor="schedule-name"
                className="input_label NewSchedule_label"
              >
                Schedule Name:
              </label>
              <input
                type="text"
                className="schedule_input "
                name="schedule-name"
                onChange={(e) => this.handleName(e)}
                required
              />
            </div>
            <div className="NewSchedule__section">
              <label
                htmlFor="hour_open"
                className="input_label NewSchedule_label"
              >
                Time Open:
              </label>
              <select
                className="Edit__hours"
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
              <label
                htmlFor="hour_closed"
                className="input_label NewSchedule_label"
              >
                Time Closed:
              </label>
              <select
                className="Edit__hours"
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
              <label
                htmlFor="services"
                className="NewSchedule_label input_label"
              >
                Services:
              </label>
              {this.renderServices()}
              <button
                className="new_service_btn"
                onClick={(e) => this.handleServicesModal(e)}
              >
                New
              </button>
              <div className="modal" onClick={(e) => this.handleClose(e)}>
                <div className="display-modal">
                  <p className="modal-close">x</p>
                  {renderServiceModal}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="submit_btn NewSchedule__submit"
              disabled={true}
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default NewScheduleForm;
