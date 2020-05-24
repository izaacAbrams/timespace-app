import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Appointments.css";
import ApptCard from "../../components/ApptCard/ApptCard";
import DatePicker from "../../components/DatePicker/DatePicker";
import EditApptForm from "../../components/EditApptForm/EditApptForm";
import TimespaceContext from "../../contexts/TimespaceContext";
import ApptApiService from "../../services/appt-api-service";

class Appointments extends Component {
  static contextType = TimespaceContext;
  state = {
    currentId: "",
  };

  filterAppts() {
    return this.context.apptList.filter(
      (appt) =>
        moment(this.context.selected_date).format("YYYYMMDD") ===
        moment(appt.appt_date_time).format("YYYYMMDD")
    );
  }

  handleDateSubmit(date) {
    let dates = document.getElementsByClassName("date-card-container");
    for (let i = 0; i < dates.length; i++) {
      moment(dates[i].id).format("MMDD") === moment(date).format("MMDD")
        ? (dates[i].className += "selected")
        : dates[i].classList.add("date-card-container");
    }

    this.context.changeSelectedDate(date);
  }

  handleEdit(id) {
    this.context.appt_modal = true;
    this.setState({ currentId: id });
    document.querySelector(".modal").style.display = "block";
  }

  handleClose(e) {
    if (
      e.target === document.querySelector(".modal-close") ||
      e.target === document.querySelector(".modal")
    ) {
      document.querySelector(".modal").style.display = "none";
      this.context.appt_edit_modal = false;
    } else {
      document.querySelector(".modal").style.display = "block";
    }
  }

  handleDelete(id) {
    this.context.deleteAppt(id);
  }

  componentDidMount() {
    ApptApiService.getScheduleId(this.props.match.params.url).then(
      (schedule) => {
        this.context.addCurrentSchedule(schedule);
        this.context.addApptList(schedule.id);
      }
    );
  }

  renderAppts() {
    const filteredAppts = this.filterAppts();
    filteredAppts.sort(
      (appt1, appt2) =>
        moment(appt1.appt_date_time).format("HHmm") -
        moment(appt2.appt_date_time).format("HHmm")
    );

    return filteredAppts.map((appt) => (
      <ApptCard
        key={appt.name + appt.id}
        appt={appt}
        handleEdit={(id) => this.handleEdit(id)}
        handleDelete={(id) => this.handleDelete(id)}
      />
    ));
  }

  render() {
    const { error } = this.context;
    let mainContent;
    if (error) {
      mainContent =
        error.error === `Appointment doesn't exist` ? (
          <p>Appointment not found</p>
        ) : (
          <p>There was an error</p>
        );
    } else {
      mainContent = this.renderAppts();
    }
    const renderEdit =
      this.context.appt_modal === true ? (
        <EditApptForm id={this.state.currentId} />
      ) : (
        <React.Fragment />
      );
    return (
      <div className="Appointments">
        <section className="Appointments__date">
          <form id="view-schedule">
            <h2>{this.context.currentSchedule.schedule}</h2>
            <DatePicker
              handleDateSubmit={(date) => this.handleDateSubmit(date)}
              apptList={this.filterAppts(this.context.apptList)}
              selected={this.context.selected_date}
            />

            <Link to={`/${this.context.currentSchedule.schedule_url}/new-appt`}>
              New Appointment
            </Link>
          </form>
        </section>
        <div className="modal" onClick={(e) => this.handleClose(e)}>
          <div className="display-modal">
            <p className="modal-close">x</p>
            {renderEdit}
          </div>
        </div>
        <main className="Appointments__main">{mainContent}</main>
      </div>
    );
  }
}

export default Appointments;
