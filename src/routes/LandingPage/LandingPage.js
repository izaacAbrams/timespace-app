import React from "react";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <h1 className="LandingPage__title">TimeSpace</h1>
      <p className="LandingPage__desc">
        TimeSpace is the ideal tool for small business needs. It is easy to set
        up and takes all the work out of putting together your schedule!
      </p>
      <button>Learn more</button>
      <button>
        <a href="/signup">Get Started</a>
      </button>
    </div>
  );
}
