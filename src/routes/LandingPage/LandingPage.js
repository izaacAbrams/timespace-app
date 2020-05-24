import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <h1 className="LandingPage__title">TimeSpaces</h1>
      <p className="LandingPage__desc">
        TimeSpaces is the ideal tool for small business needs. It is easy to set
        up and takes all the work out of putting together your schedule! <br />
        <br />
        When you sign up for an account, you will have access to creating your
        own custom schedules, each with a unique URL to share to anyone wanting
        to schedule an appointment. <br />
        <br />
        In the case you just want to manually enter in an appointment, not to
        worry, its easy to create a new appointment or edit an existing one!
      </p>
      <p>
        To demo from the user side, try the demo user: demo@account.com with
        password: demopassword
      </p>
      <div className="LandingPage__btn_wrapper">
        <Link to="/signup" className="LandingPage__button">
          Get Started
        </Link>
        <Link to="/sallys-salon-spa/new-appt" className="LandingPage__button">
          Demo New Appointment
        </Link>
      </div>
    </div>
  );
}
