import config from "../config";
import TokenService from "./token-service";

const ApptApiService = {
  getAppts(scheduleId) {
    return fetch(`${config.API_ENDPOINT}/appointments/schedule/${scheduleId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getScheduleId(scheduleUrl) {
    return fetch(`${config.API_ENDPOINT}/schedules/id/${scheduleUrl}`, {
      method: "GET",
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  postAppt(appt) {
    return fetch(`${config.API_ENDPOINT}/appointments/`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(appt),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deleteAppt(apptId) {
    return fetch(`${config.API_ENDPOINT}/appointments/${apptId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    });
  },
  getTimesForNewAppt(scheduleId) {
    return fetch(`${config.API_ENDPOINT}/appointments/new-appt/${scheduleId}`, {
      method: "GET",
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  patchAppt(apptId, updatedAppt) {
    return fetch(`${config.API_ENDPOINT}/appointments/${apptId}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedAppt),
    });
  },
};

export default ApptApiService;
