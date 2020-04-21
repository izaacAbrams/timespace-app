import React, { Component } from "react";
import "./LoginForm.css";

class LoginForm extends Component {
  render() {
    return (
      <div className="LoginForm">
        <header>
          <h1>Login</h1>
        </header>
        <section className="LoginForm__main_section">
          <form id="login">
            <div className="LoginForm__section">
              <label htmlFor="user-name">User Name:</label>
              <input type="text" name="user-name" required />
            </div>
            <div className="LoginForm__section">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    );
  }
}

export default LoginForm;
