import React, { Component } from "react";
import seedAppt from "../seedAppts.json";

// export const nullAppt = {
//   name: "",
//   id: "",
//   service: [],
//   schedule_id: "",
//   apt_date_time: "",
// };

const ApptContext = React.createContext({
  apptList: seedAppt,
  error: null,
  setError: () => {},
  clearError: () => {},
  setAppt: () => {},
});

export default ApptContext;

export class ApptProvider extends Component {
  state = {
    apptList: [],
    error: null,
  };

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setAppt = (apptList) => {
    this.setState({ apptList });
  };

  render() {
    const value = {
      apptList: this.state.apptList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.setError,
      setAppt: this.setAppt,
    };
    return (
      <ApptContext.Provider value={value}>
        {this.props.children}
      </ApptContext.Provider>
    );
  }
}
