import React, { Component } from "react";
import TokenService from "../../services/token-service";
import "./LoginForm.css";

class LoginForm extends Component {
  state = {
    userName: "",
    password: "",
  };

  handleSubmit(e) {
    e.preventDefault();
    const { user_name, password } = e.target;

    this.setState({
      userName: user_name.value,
      password: password.value,
    });
    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(user_name, password)
    );
    this.handleLoginSuccess();
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/schedules";
    history.push(destination);
  };
  render() {
    return (
      <div className="LoginForm">
        <header>
          <h1>Login</h1>
        </header>
        <section className="LoginForm__main_section">
          <form id="login" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="LoginForm__section">
              <label htmlFor="user_name">User Name:</label>
              <input
                type="text"
                className="LoginForm__user_name"
                name="user_name"
                required
              />
            </div>
            <div className="LoginForm__section">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                className="LoginForm__password"
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    );
  }
}

export default LoginForm;
