import React, { Component } from "react";
import { Link } from "react-router-dom";
import TimespaceContext from "../../contexts/TimespaceContext";
import TokenService from "../../services/token-service";
import ScheduleList from "../../components/ScheduleList/ScheduleList";
import EditScheduleForm from "../../components/EditScheduleForm/EditScheduleForm";
import "./Schedules.css";

class Schedules extends Component {
  static contextType = TimespaceContext;
  state = {
    currentSchedule: "",
  };
  handleEdit(schedule) {
    this.context.schedule_modal = true;
    this.setState({ currentSchedule: schedule });
    document.querySelector(".modal").style.display = "block";
  }

  handleClose(e) {
    if (
      e.target === document.querySelector(".modal-close") ||
      e.target === document.querySelector(".modal")
    ) {
      document.querySelector(".modal").style.display = "none";
      this.props.history.push(`/schedules`);
      this.context.schedule_modal = false;
    } else {
      document.querySelector(".modal").style.display = "block";
    }
  }
  handleDelete(currentSchedule) {
    const schedule = this.context.scheduleList.find(
      (schedule) => schedule.schedule_url === currentSchedule
    );
    this.context.deleteSchedule(schedule.id);
  }

  componentDidMount() {
    if (!!!this.context.scheduleList.length) {
      this.context.addScheduleList(TokenService.readJwtToken().user_id);
    }
  }

  render() {
    const renderEdit =
      this.context.schedule_modal === true ? (
        <EditScheduleForm
          schedule={this.state.currentSchedule}
          {...this.props.history}
        />
      ) : (
        <React.Fragment />
      );
    return (
      <div className="Schedules__main">
        <div className="Schedules__header">
          <h1 className="header">Your Schedules</h1>
          <Link to="/new-schedule" className="new_schedule">
            +
          </Link>
        </div>
        <div className="modal" onClick={(e) => this.handleClose(e)}>
          <div className="display-modal">
            <p className="modal-close">x</p>
            {renderEdit}
          </div>
        </div>
        {this.context.scheduleList.map((schedule) => (
          <ScheduleList
            key={schedule.schedule}
            schedule={schedule}
            handleEdit={(e) => this.handleEdit(e)}
            handleDelete={(schedule) => this.handleDelete(schedule)}
          />
        ))}
      </div>
    );
  }
}

export default Schedules;
