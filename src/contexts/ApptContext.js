import React, { Component } from "react";

// export const nullAppt = {
//   name: "",
//   id: "",
//   service: [],
//   schedule_id: "",
//   apt_date_time: "",
// };

const ApptContext = React.createContext({
  apptList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setAppt: () => {},
  clearAppt: () => {},
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

  // clearAppt = () => {
  //   this.setAppt(nullAppt);
  // };

  render() {
    const value = {
      apptList: this.state.apptList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.setError,
      setAppt: this.setAppt,
      clearAppt: this.clearAppt,
    };
    return (
      <ApptContext.Provider value={value}>
        {this.props.children}
      </ApptContext.Provider>
    );
  }
}
