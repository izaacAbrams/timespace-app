import React, { Component } from "react";
import "./Appointments.css";

class Appointments extends Component {
  render() {
    return (
      <div className="Appointments">
        <section className="Appointments__date">
          <form id="view-schedule">
            <h2>Sally's Salon & Spa</h2>
            <div className="form-section">
              <label htmlFor="schedule-date">Date:</label>
              <input type="date" name="schedule-name" required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>
        <main className="Appointments__main">
          <div className="Appointments__main_appt">
            <h3>Joe Smith</h3>
            <p>8am-9am</p>
            <p>Service: Nails</p>
            <button>Edit</button>
            <button>Delete</button>
          </div>
          <div className="Appointments__main_appt">
            <h3>Jane Smith</h3>
            <p>12pm-2pm</p>
            <p>Service: Salon</p>
            <button>Edit</button>
            <button>Delete</button>
          </div>
          <div className="Appointments__main_appt">
            <h3>Brian</h3>
            <p>3pm-4pm</p>
            <p>Service: Spa</p>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </main>
      </div>
    );
  }
}

export default Appointments;
