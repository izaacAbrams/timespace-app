import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Appointments.css";
import seedSchedules from "../../seedSchedules.json";
import ApptCard from "../../components/ApptCard/ApptCard";
import DatePicker from "../../components/DatePicker/DatePicker";
import ApptContext from "../../contexts/ApptContext";

class Appointments extends Component {
  static contextType = ApptContext;
  state = {
    selected_date: moment().format(),
  };
  findSchedule() {
    return seedSchedules.find(
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
    // return scheduleFilter.filter(
    //   (appt) =>
    //     moment(appt.appt_date_time).format("L") ===
    //     moment(this.state.selected_date).format("L")
    // );
  }

  renderAppts() {
    const { apptList = [] } = this.context;
    const filteredAppts = this.filterAppts(apptList);
    console.log(
      filteredAppts.sort(
        (appt1, appt2) =>
          moment(appt1.appt_date_time).format("HHmm") -
          moment(appt2.appt_date_time).format("HHmm")
      )
    );

    return filteredAppts
      .map((appt) => (
        <ApptCard
          name={appt.name}
          key={appt.id}
          schedule={appt.schedule}
          service={appt.service}
          appt={appt.appt_date_time}
        />
      ))
      .sort(
        (appt1, appt2) =>
          moment(appt1.appt_date_time).format("HHmm") -
          moment(appt2.appt_date_time).format("HHmm")
      );
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
    return (
      <div className="Appointments">
        <section className="Appointments__date">
          <form id="view-schedule">
            <h2>{this.findSchedule().schedule}</h2>
            <DatePicker />

            <Link to={`/${this.findSchedule().id}/new-appt`}>
              New Appointment
            </Link>
          </form>
        </section>
        <main className="Appointments__main">{mainContent}</main>
      </div>
    );
  }
}

export default Appointments;
