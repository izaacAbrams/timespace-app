import config from "../config";
import TokenService from "./token-service";

const ScheduleApiService = {
  getSchedules(user) {
    return fetch(`${config.API_ENDPOINT}/schedules/user/${user}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  patchSchedule(scheduleId, updatedSchedule) {
    return fetch(`${config.API_ENDPOINT}/schedules/${scheduleId}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedSchedule),
    });
  },
  postSchedule(schedule) {
    return fetch(`${config.API_ENDPOINT}/schedules/`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },

      body: JSON.stringify(schedule),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteSchedule(scheduleId) {
    return fetch(`${config.API_ENDPOINT}/schedules/${scheduleId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    });
  },
};

export default ScheduleApiService;
