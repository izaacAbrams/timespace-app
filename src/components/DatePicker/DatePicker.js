import React from "react";

export default function DatePicker() {
  return (
    <div className="form-section">
      <label htmlFor="schedule-date">Date:</label>
      <input type="date" name="schedule-date" required />

      <button type="submit">Submit</button>
    </div>
  );
}
