import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import TimespaceContext from "../../contexts/TimespaceContext";
import "./LoginForm.css";

class LoginForm extends Component {
  static contextType = TimespaceContext;

  state = {
    email: "",
    password: "",
    error: null,
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
        this.context.updateSignedIn(true);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };
  render() {
    const { error } = this.state;
    return (
      <div className="LoginForm">
        <section className="LoginForm__main_section">
          <form id="login" onSubmit={this.handleSubmitJwtAuth}>
            <div role="alert">{error && <p className="red">{error}</p>}</div>
            <div className="LoginForm__section">
              <label htmlFor="email" className="input_label">
                Email:
              </label>
              <input
                type="text"
                className="LoginForm__email"
                name="email"
                required
              />
            </div>
            <div className="LoginForm__section">
              <label htmlFor="password" className="input_label">
                Password:
              </label>
              <input
                type="password"
                name="password"
                className="LoginForm__password"
                required
              />
            </div>
            <button className="submit_btn" type="submit">
              Submit
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default LoginForm;
