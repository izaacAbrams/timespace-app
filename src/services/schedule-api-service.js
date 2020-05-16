import config from "../config";

const ScheduleApiService = {
  getSchedules(user) {
    return fetch(`${config.API_ENDPOINT}/schedules/user/${user}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer fd78e65a-123c-4521-bdd2-d286eb1b8b6d",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postSchedule(schedule) {
    return (fetch(`${config.API_ENDPOINT}/schedules`),
    {
      method: "POST",
      headers: {
        Authorization: "Bearer fd78e65a-123c-4521-bdd2-d286eb1b8b6d",
        "content-type": "application/json",
      },
      body: JSON.stringify(schedule),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default ScheduleApiService;
