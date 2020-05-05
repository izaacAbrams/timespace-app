import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Appointments.css";
import ApptCard from "../../components/ApptCard/ApptCard";
import DatePicker from "../../components/DatePicker/DatePicker";
import ApptContext from "../../contexts/ApptContext";
import ScheduleContext from "../../contexts/ScheduleContext";

class Appointments extends Component {
  static contextType = ApptContext;
  state = {
    selected_date: moment().format(),
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
    this.setState({
      selected_date: date,
    });
  }

  renderAppts() {
    const { apptList = [] } = this.context;
    const filteredAppts = this.filterAppts(apptList);

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
          <ScheduleContext.Consumer>
            {(scheduleContext) => (
              <form id="view-schedule">
                <h2>{this.findSchedule(scheduleContext).schedule}</h2>
                <DatePicker
                  handleDateSubmit={(date) => this.handleDateSubmit(date)}
                />

                <Link to={`/${this.findSchedule(scheduleContext).id}/new-appt`}>
                  New Appointment
                </Link>
              </form>
            )}
          </ScheduleContext.Consumer>
        </section>
        <main className="Appointments__main">{mainContent}</main>
      </div>
    );
  }
}

export default Appointments;
