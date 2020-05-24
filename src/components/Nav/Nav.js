import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import "./Nav.css";

export default class Nav extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.forceUpdate();
  };

  renderLogout() {
    return (
      <div className="Header__logged-in">
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLogin() {
    return (
      <div className="Header__not-logged-in">
        <div className="Nav__section">
          <Link to="/signup" className="register">
            Register
          </Link>

          <Link to="/login" className="login">
            Log in
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <nav className="Nav">
        <Link to="/" className="Nav__section">
          Home
        </Link>
        <Link to="/schedules" className="Nav__section">
          Schedules
        </Link>
        {TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}
      </nav>
    );
  }
}
