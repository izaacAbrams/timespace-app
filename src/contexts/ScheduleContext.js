import React, { Component } from "react";
import seedSchedules from "../seedSchedules.json";

const ScheduleContext = React.createContext({
  scheduleList: seedSchedules,
  error: null,
  setError: () => {},
  clearError: () => {},
  setSchedule: () => {},
});

export default ScheduleContext;

export class ScheduleProvider extends Component {
  state = {
    scheduleList: [],
    error: null,
  };
  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setSchedule = (scheduleList) => {
    this.setState({ scheduleList });
  };

  render() {
    const value = {
      scheduleList: this.state.scheduleList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.setError,
      setSchedule: this.setSchedule,
    };
    return (
      <ScheduleContext.Provider value={value}>
        {this.props.children}
      </ScheduleContext.Provider>
    );
  }
}
