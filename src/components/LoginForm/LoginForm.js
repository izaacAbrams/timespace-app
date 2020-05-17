import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import "./LoginForm.css";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
  };

  handleSubmitJwtAuth = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { email, password } = e.target;

    AuthApiService.postLogin({
      email: email.value,
      password: password.value,
    })
      .then((res) => {
        email.value = "";
        password.value = "";
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };
  render() {
    return (
      <div className="LoginForm">
        <section className="LoginForm__main_section">
          <form id="login" onSubmit={this.handleSubmitJwtAuth}>
            <div className="LoginForm__section">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="LoginForm__email"
                name="email"
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
