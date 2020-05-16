import React, { Component } from "react";

const ApptContext = React.createContext({
  apptList: [],
  error: null,
  modal: false,
  setError: () => {},
  clearError: () => {},
  setAppts: () => {},
  addAppts: () => {},
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

  setAppts = (apptList) => {
    console.log(apptList);
    this.setState({ apptList });
  };

  addAppts = (newAppts, cb) => {
    this.setState(
      {
        ...this.state.apptList,
        newAppts,
      },
      cb
    );
  };
  render() {
    const value = {
      apptList: this.state.apptList,
      error: this.state.error,
      modal: this.state.modal,
      setError: this.setError,
      clearError: this.setError,
      setAppts: this.setAppts,
      addAppts: this.addAppts,
    };
    return (
      <ApptContext.Provider value={value}>
        {this.props.children}
      </ApptContext.Provider>
    );
  }
}
