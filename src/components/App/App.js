import React from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "../Nav/Nav";
import LandingPage from "../../routes/LandingPage/LandingPage";
import SignUpForm from "../SignUpForm/SignUpForm";
import NewApptForm from "../NewApptForm/NewApptForm";
import Appointments from "../../routes/Appointments/Appointments";
import LoginForm from "../LoginForm/LoginForm";
import NewScheduleForm from "../NewScheduleForm/NewScheduleForm";
import PrivateRoute from "../Utils/PrivateRoute";
import NotFound from "../NotFound/NotFound";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <Nav />
      </header>

      <main className="App__main">
        <Switch>
          <Route exact path={"/"} component={LandingPage} />
          <Route path={"/signup"} component={SignUpForm} />
          <Route path={"/login"} component={LoginForm} />
          <Route path={"/new-appt"} component={NewApptForm} />
          <PrivateRoute path={"/appointments"} component={Appointments} />
          <PrivateRoute path={"/new-schedule"} component={NewScheduleForm} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
