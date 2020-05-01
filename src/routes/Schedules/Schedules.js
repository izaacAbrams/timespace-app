import React, { Component } from "react";
import scheduleData from "../../seedSchedules.json";
import ScheduleList from "../../components/ScheduleList/ScheduleList";

class Schedules extends Component {
  render() {
    return (
      <div>
        <h1>Your Schedules</h1>
        {scheduleData.map((schedule) => (
          <ScheduleList
            key={schedule.id}
            id={schedule.id}
            name={schedule.schedule}
            {...this.props.history}
          />
        ))}
      </div>
    );
  }
}

export default Schedules;
