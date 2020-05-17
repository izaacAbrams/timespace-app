import config from "../config";

const ApptApiService = {
  getAppts(scheduleId) {
    return fetch(`${config.API_ENDPOINT}/appointments/schedule/${scheduleId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer fd78e65a-123c-4521-bdd2-d286eb1b8b6d",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getSchedule(scheduleUrl) {
    return fetch(`${config.API_ENDPOINT}/schedules/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer fd78e65a-123c-4521-bdd2-d286eb1b8b6d",
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((resJson) =>
        resJson.find((schedule) => schedule.schedule_url === scheduleUrl)
      );
  },
  postAppt(appt) {
    return fetch(`${config.API_ENDPOINT}/appointments/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer fd78e65a-123c-4521-bdd2-d286eb1b8b6d",
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
        Authorization: "Bearer fd78e65a-123c-4521-bdd2-d286eb1b8b6d",
      },
    });
  },

  patchAppt(apptId, updatedAppt) {
    return fetch(`${config.API_ENDPOINT}/appointments/${apptId}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer fd78e65a-123c-4521-bdd2-d286eb1b8b6d",
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedAppt),
    });
  },
};

export default ApptApiService;
