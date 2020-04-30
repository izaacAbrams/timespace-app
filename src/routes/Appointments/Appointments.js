import React, { Component } from "react";
import "./Appointments.css";
import seedAppts from "../../seed.json";
import ApptCard from "../../components/ApptCard/ApptCard";

class Appointments extends Component {
  render() {
    return (
      <div className="Appointments">
        <section className="Appointments__date">
          <form id="view-schedule">
            <h2>Sally's Salon & Spa</h2>
            <div className="form-section">
              <label htmlFor="schedule-date">Date:</label>
              <input type="date" name="schedule-date" required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>
        <main className="Appointments__main">
          {seedAppts.map((appt) => (
            <ApptCard
              name={appt.name}
              key={appt.id}
              service={appt.service}
              time={appt.appt_time}
              date={appt.appt_date}
              year={appt.appt_year}
              month={appt.appt_month}
            />
          ))}
        </main>
      </div>
    );
  }
}

export default Appointments;
