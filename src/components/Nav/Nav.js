import React from "react";
import "./Nav.css";
export default function Nav() {
  return (
    <div className="Nav">
      <a href="/" className="Appointments__nav">
        <p>Home</p>
      </a>
      <a href="/signup" className="Appointments__nav">
        <p>Sign Up</p>
      </a>
      <a href="/login" className="Appointments__nav">
        <p>Login</p>
      </a>
    </div>
  );
}
