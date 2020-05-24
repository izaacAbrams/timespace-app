import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import "./SignUpForm.css";

class SignUpForm extends Component {
  state = {
    error: null,
  };
  handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = e.target;
    this.setState({ error: null });

    AuthApiService.postUser({
      name: name.value,
      email: email.value,
      password: password.value,
    })
      .then((user) => {
        name.value = "";
        email.value = "";
        password.value = "";
        const { history } = this.props;
        history.push("/login");
      })
      .catch((res) => this.setState({ error: res.error }));
  }
  render() {
    const { error } = this.state;
    return (
      <div className="SignUpForm">
        <h2 className="SignUpForm__title">Sign Up Form</h2>
        <main className="SignUpForm__main">
          <form
            className="SignUpForm__form"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <div role="alert">{error && <p className="red">{error}</p>}</div>
            <div className="SignUpForm__section">
              <label htmlFor="name">Full Name:</label>
              <input type="text" name="name" placeholder="Joe Smith" required />
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

            <button type="submit">Submit</button>
          </form>
        </main>
      </div>
    );
  }
}

export default SignUpForm;
