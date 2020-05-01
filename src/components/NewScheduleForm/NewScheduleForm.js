import React, { Component } from "react";
import "./NewScheduleForm.css";

class NewScheduleForm extends Component {
  render() {
    return (
      <div className="NewSchedule">
        <header>
          <h1>Create a Schedule</h1>
        </header>
        <section className="NewSchedule__main_section">
          <form id="new-schedule">
            <div className="NewSchedule__section">
              <label htmlFor="schedule-name">Schedule Name:</label>
              <input
                type="text"
                name="schedule-name"
                placeholder="Sally's Salon & Spa"
                required
              />
            </div>
            <div className="NewSchedule__section">
              <label htmlFor="hours">Hours:</label>
              <select className="NewSchedule__hours" required>
                <option>1:00</option>
                <option>2:00</option>
                <option>3:00</option>
                <option>4:00</option>
                <option>5:00</option>
                <option>6:00</option>
                <option>7:00</option>
                <option>8:00</option>
                <option>9:00</option>
                <option>10:00</option>
                <option>11:00</option>
                <option>12:00</option>
              </select>
              <select>
                <option>AM</option>
                <option>PM</option>
              </select>
              <span>-</span>
              <select className="NewSchedule__hours" required>
                <option>1:00</option>
                <option>2:00</option>
                <option>3:00</option>
                <option>4:00</option>
                <option>5:00</option>
                <option>6:00</option>
                <option>7:00</option>
                <option>8:00</option>
                <option>9:00</option>
                <option>10:00</option>
                <option>11:00</option>
                <option>12:00</option>
              </select>
              <select>
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
            <div className="NewSchedule__section">
              <label htmlFor="services">Services:</label>
              <input type="text" name="services" />
            </div>
            <div className="NewSchedule__section">
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                placeholder="Sally's salon, where we do salon stuff"
              ></textarea>
            </div>

            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    );
  }
}

export default NewScheduleForm;
