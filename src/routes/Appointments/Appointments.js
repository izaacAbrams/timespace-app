import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Appointments.css";
import seedAppts from "../../seedAppts.json";
import seedSchedules from "../../seedSchedules.json";
import ApptCard from "../../components/ApptCard/ApptCard";
import DatePicker from "../../components/DatePicker/DatePicker";
import ApptContext from "../../contexts/ApptContext";

class Appointments extends Component {
  static contextType = ApptContext;

  findSchedule() {
    return seedSchedules.find(
      (schedule) => schedule.id === this.props.match.params.id
    );
  }

  filterAppts(filteredAppts) {
    return filteredAppts.filter(
      (appt) => appt.schedule === this.props.match.params.id
    );
  }

  componentDidMount() {
    this.context.clearError();
  }

  renderAppts() {
    const { apptList = [] } = this.context;

    seedAppts.forEach((appts) => this.context.apptList.push(appts));
    const filteredAppts = this.filterAppts(apptList);
    console.log(filteredAppts);
    return filteredAppts.map((appt) => (
      <ApptCard
        name={appt.name}
        key={appt.id}
        schedule={appt.schedule}
        service={appt.service}
        appt={appt.appt_date_time}
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
    return (
      <div className="Appointments">
        <section className="Appointments__date">
          <form id="view-schedule">
            <h2>{this.findSchedule().schedule}</h2>
            <DatePicker />

            <Link to={"/new-appt/" + this.props.match.params.id}>
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
