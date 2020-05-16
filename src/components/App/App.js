import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import moment from "moment";
import Nav from "../Nav/Nav";
import LandingPage from "../../routes/LandingPage/LandingPage";
import SignUpForm from "../SignUpForm/SignUpForm";
import NewApptForm from "../NewApptForm/NewApptForm";
import Appointments from "../../routes/Appointments/Appointments";
import LoginForm from "../LoginForm/LoginForm";
import NewScheduleForm from "../../routes/NewScheduleForm/NewScheduleForm";
import Schedules from "../../routes/Schedules/Schedules";
import ApptApiService from "../../services/appt-api-service";
import PrivateRoute from "../Utils/PrivateRoute";
import NotFound from "../../routes/NotFound/NotFound";
import Success from "../../routes/Success/Success";
import TimespaceContext from "../../contexts/TimespaceContext";

import "./App.css";
import ScheduleApiService from "../../services/schedule-api-service";

class App extends Component {
  static contextType = TimespaceContext;

  state = {
    currentSchedule: {},
    apptList: [],
    scheduleList: [],
    apptTimesList: [],
    appt_modal: false,
    schedule_modal: false,
    selected_date: moment().format(),
    addAppt: (appt) => {
      ApptApiService.postAppt(appt);
      this.state.apptList.push(appt);
    },
    addApptList: (scheduleId) => {
      ApptApiService.getAppts(scheduleId)
        .then((apptList) => {
          this.setState({ apptList });
        })
        .catch(this.state.setError);
    },
    addScheduleList: (userId) => {
      ScheduleApiService.getSchedules(userId).then((scheduleList) => {
        this.setState({ scheduleList });
      });
    },
    addApptTimesList: (scheduleId) => {
      ApptApiService.getAppts(scheduleId).then((appt) => {
        const apptTimesList = appt.map((appt) => {
          return {
            appt_date_time: moment(appt.appt_date_time, "HHmm").format(),
          };
        });
        this.setState({ apptTimesList });
      });
    },
    changeSelectedDate: (date) => {
      this.setState({ selected_date: date });
    },
    deleteAppt: (apptId) => {
      ApptApiService.deleteAppt(apptId);
      this.setState({
        apptList: this.state.apptList.filter((appt) => apptId === appt.id),
      });
    },
    patchAppt: (apptId, updatedAppt) => {
      console.log(updatedAppt);
      ApptApiService.patchAppt(apptId, updatedAppt);
      const newAppt = this.state.apptList
        .filter((appt) => appt.id === apptId)
        .push(updatedAppt);
      this.setState({
        apptList: newAppt,
      });
    },
    addCurrentSchedule: (currentSchedule) => {
      this.setState({ currentSchedule });
    },
  };

  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <TimespaceContext.Provider value={this.state}>
          <header className="App__header">
            <Nav />
          </header>

          <main className="App__main">
            <Switch>
              <Route exact path={"/"} component={LandingPage} />
              <Route path={"/signup"} component={SignUpForm} />
              <Route path={"/login"} component={LoginForm} />
              <Route path={"/:name/new-appt"} component={NewApptForm} />
              <PrivateRoute path={"/schedules/:url"} component={Appointments} />
              <PrivateRoute
                path={"/new-schedule"}
                component={NewScheduleForm}
              />
              <PrivateRoute path={"/schedules"} component={Schedules} />
              <Route path={"/success"} component={Success} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </TimespaceContext.Provider>
      </div>
    );
  }
}

export default App;
