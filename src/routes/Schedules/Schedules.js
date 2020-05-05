import React, { Component } from "react";
import { Link } from "react-router-dom";
import ScheduleContext from "../../contexts/ScheduleContext";
import ScheduleList from "../../components/ScheduleList/ScheduleList";
import EditScheduleForm from "../../components/EditScheduleForm/EditScheduleForm";
import moment from "moment";
import "./Schedules.css";

class Schedules extends Component {
  static contextType = ScheduleContext;
  state = {
    currentId: "",
  };
  handleEdit(id) {
    this.context.modal = true;
    this.setState({ currentId: id });
    document.querySelector(".modal").style.display = "block";
  }

  handleClose(e) {
    if (
      e.target === document.querySelector(".modal-close") ||
      e.target === document.querySelector(".modal")
    ) {
      document.querySelector(".modal").style.display = "none";
      this.props.history.push(`/schedules`);
      this.context.modal = false;
    } else {
      document.querySelector(".modal").style.display = "block";
    }
  }
  handleDelete(id) {
    this.context.scheduleList = this.context.scheduleList.filter(
      (s) => s.id !== id
    );
    this.props.history.push("/schedules");
  }
  renderHours() {
    let scheduleHours = [];
    for (let i = 100; i <= 2400; i += 100) {
      scheduleHours.push(moment(i, "Hmm").format("h:mm a"));
    }
    return scheduleHours;
  }

  render() {
    const renderEdit =
      this.context.modal === true ? (
        <EditScheduleForm id={this.state.currentId} {...this.props.history} />
      ) : (
        <React.Fragment />
      );
    return (
      <div>
        <div className="Schedule__header">
          <h1>Your Schedules</h1>
          <Link to="/new-schedule">New</Link>
        </div>
        <div className="modal" onClick={(e) => this.handleClose(e)}>
          <div className="display-modal">
            <p className="modal-close">x</p>
            {renderEdit}
          </div>
        </div>
        {this.context.scheduleList.map((schedule) => (
          <ScheduleList
            key={schedule.id}
            id={schedule.id}
            name={schedule.schedule}
            handleEdit={(e) => this.handleEdit(e)}
            handleDelete={(id) => this.handleDelete(id)}
            {...this.props.history}
          />
        ))}
      </div>
    );
  }
}

export default Schedules;
