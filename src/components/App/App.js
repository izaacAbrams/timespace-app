import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import moment from "moment";
import Nav from "../Nav/Nav";
import LandingPage from "../../routes/LandingPage/LandingPage";
import SignUpForm from "../SignUpForm/SignUpForm";
import NewApptForm from "../NewApptForm/NewApptForm";
import Appointments from "../../routes/Appointments/Appointments";
import LoginPage from "../../routes/LoginPage/LoginPage";
import NewScheduleForm from "../../routes/NewScheduleForm/NewScheduleForm";
import Schedules from "../../routes/Schedules/Schedules";
import ApptApiService from "../../services/appt-api-service";
import ScheduleApiService from "../../services/schedule-api-service";
import PrivateRoute from "../Utils/PrivateRoute";
import NotFound from "../../routes/NotFound/NotFound";
import Success from "../../routes/Success/Success";
import TimespaceContext from "../../contexts/TimespaceContext";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import IdleService from "../../services/idle-service";

import "./App.css";

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
      ApptApiService.getTimesForNewAppt(scheduleId).then((appt) => {
        const apptTimesList = appt.map((appt) => {
          return {
            appt_date_time: moment(appt.appt_date_time).format(),
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
        apptList: this.state.apptList.filter((appt) => apptId !== appt.id),
      });
    },
    deleteSchedule: (scheduleId) => {
      ScheduleApiService.deleteSchedule(scheduleId);
      this.setState({
        scheduleList: this.state.scheduleList.filter(
          (schedule) => scheduleId !== schedule.id
        ),
      });
    },
    patchAppt: (apptId, updatedAppt) => {
      ApptApiService.patchAppt(apptId, updatedAppt);
      const updatedApptList = this.state.apptList.map((appt) => {
        return appt.id === apptId ? updatedAppt : appt;
      });
      this.setState({
        apptList: updatedApptList,
      });
    },
    patchSchedule: (scheduleId, updatedSchedule) => {
      ScheduleApiService.patchSchedule(scheduleId, updatedSchedule);
      const updatedScheduleList = this.state.scheduleList.map((schedule) => {
        return schedule.id === scheduleId ? updatedSchedule : schedule;
      });
      this.setState({
        scheduleList: updatedScheduleList,
      });
    },
    addSchedule: (schedule) => {
      ScheduleApiService.postSchedule(schedule);
      this.state.scheduleList.push(schedule);
    },
    addCurrentSchedule: (currentSchedule) => {
      this.setState({ currentSchedule });
    },
    isSignedIn: TokenService.hasAuthToken(),
    updateSignedIn: (status) => {
      this.setState({ isSignedIn: status });
    },
    error: null,
  };

  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle);
    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets();

      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.forceUpdate();
  };

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <Nav />
        </header>
        <TimespaceContext.Provider value={this.state}>
          <main className="App__main">
            <Switch>
              <Route exact path={"/"} component={LandingPage} />
              <Route path={"/signup"} component={SignUpForm} />
              <Route path={"/login"} component={LoginPage} />
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
