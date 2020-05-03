import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <div className="Nav">
      <Link to="/" className="Appointments__nav">
        Home
      </Link>
      <Link to="/signup" className="Appointments__nav">
        Sign Up
      </Link>
      <Link to="/login" className="Appointments__nav">
        Login
      </Link>
      <Link to="/schedules" className="Appointments__nav">
        Schedules
      </Link>
    </div>
  );
}
