import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Appointments.css";
import ApptCard from "../../components/ApptCard/ApptCard";
import DatePicker from "../../components/DatePicker/DatePicker";
import EditApptForm from "../../components/EditApptForm/EditApptForm";
import ApptContext from "../../contexts/ApptContext";
import ScheduleContext from "../../contexts/ScheduleContext";

class Appointments extends Component {
  static contextType = ApptContext;
  state = {
    selected_date: moment().format(),
    currentId: "",
  };
  findSchedule(scheduleContext) {
    return scheduleContext.scheduleList.find(
      (schedule) => schedule.id === this.props.match.params.id
    );
  }

  filterAppts(filteredAppts) {
    return filteredAppts.filter(
      (appt) =>
        appt.schedule === this.props.match.params.id &&
        moment(appt.appt_date_time).format("L") ===
          moment(this.state.selected_date).format("L")
    );
  }

  handleDateSubmit(date) {
    let dates = document.getElementsByClassName("date-card-container");
    for (let i = 0; i < dates.length; i++) {
      moment(dates[i].id).format("MMDD") === moment(date).format("MMDD")
        ? dates[i].className += "selected"
        : dates[i].classList.add("date-card-container");
    }

    this.setState({
      selected_date: date,
    });
  }

  handleEdit(id) {
    this.context.modal = true;
    this.setState({ currentId: id });
    document.querySelector(".modal").style.display = "block";
  }

  handleClose(e) {
    if (
      e.target === document.querySelector(".modal-close") ||
      e.target === document.querySelector(".modal")
    ) {
      document.querySelector(".modal").style.display = "none";
      this.props.history.push(`/schedules/${this.props.match.params.id}`);
      this.context.modal = false;
    } else {
      document.querySelector(".modal").style.display = "block";
    }
  }

  handleDelete(id) {
    this.context.apptList = this.context.apptList.filter((a) => a.id !== id);
    this.props.history.push(`/schedules/${this.props.match.params.id}`);
  }

  renderAppts() {
    const { apptList = [] } = this.context;
    const filteredAppts = this.filterAppts(apptList);
    filteredAppts.sort(
      (appt1, appt2) =>
        moment(appt1.appt_date_time).format("HHmm") -
        moment(appt2.appt_date_time).format("HHmm")
    );

    return filteredAppts.map((appt) => (
      <ApptCard
        name={appt.name}
        key={appt.id}
        id={appt.id}
        service={appt.service}
        appt={appt.appt_date_time}
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
      this.context.modal === true ? (
        <EditApptForm id={this.state.currentId} {...this.props} />
      ) : (
        <React.Fragment />
      );
    return (
      <div className="Appointments">
        <section className="Appointments__date">
          <ScheduleContext.Consumer>
            {(scheduleContext) => (
              <form id="view-schedule">
                <h2>{this.findSchedule(scheduleContext).schedule}</h2>
                <DatePicker
                  handleDateSubmit={(date) => this.handleDateSubmit(date)}
                  apptList={this.filterAppts(this.context.apptList)}
                  selected={this.state.selected_date}
                />

                <Link to={`/${this.findSchedule(scheduleContext).id}/new-appt`}>
                  New Appointment
                </Link>
              </form>
            )}
          </ScheduleContext.Consumer>
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
