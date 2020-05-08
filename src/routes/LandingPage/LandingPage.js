import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <h1 className="LandingPage__title">TimeSpaces</h1>
      <p className="LandingPage__desc">
        TimeSpaces is the ideal tool for small business needs. It is easy to set
        up and takes all the work out of putting together your schedule!
      </p>
      <Link to="/signup" className="LandingPage__button">
        Get Started
      </Link>
    </div>
  );
}
