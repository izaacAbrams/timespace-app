import React, { Component } from "react";
import "./SignUpForm.css";
class SignUpForm extends Component {
  render() {
    return (
      <div className="SignUpForm">
        <h2 className="SignUpForm__title">Sign Up Form</h2>
        <main className="SignUpForm__main">
          <form className="SignUpForm__form">
            <div className="SignUpForm__section">
              <label htmlFor="full-name">Full Name:</label>
              <input
                type="text"
                name="full-name"
                placeholder="Joe Smith"
                required
              />
            </div>
            <div className="SignUpForm__section">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="SignUpForm__section">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" required />
            </div>
            <div className="SignUpForm__section">
              <label htmlFor="repeat-password">Repeat Password:</label>
              <input type="password" name="repeat-password" required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </main>
      </div>
    );
  }
}

export default SignUpForm;
