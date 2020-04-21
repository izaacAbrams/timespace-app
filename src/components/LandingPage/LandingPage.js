import React from "react";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <h1 className="LandingPage__title">TimeSpace</h1>
      <p className="LandingPage__desc">
        TimeSpace is the ideal tool for small business needs. This is the
        landing page.
      </p>
      <button>Learn more</button>
      <button>
        <a href="/appointments">View Schedule</a>
      </button>
    </div>
  );
}
