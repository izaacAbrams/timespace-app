import React from "react";
import ReactDOM from "react-dom";
import Schedules from "../routes/Schedules/Schedules.js";
import renderer from "react-test-renderer";
import App from "../components/App/App";
import { BrowserRouter } from "react-router-dom";

describe("schedules component", () => {
  it("renders test schedule", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <App>
          <Schedules />
        </App>
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders the UI as expected", () => {
    const appt = {
      schedule: "Test Schedule",
      user_id: 1,
      date_created: new Date("2029-01-22T16:28:32.615Z").toISOString(),
      services: {
        name: "test",
        duration: "15",
      },
    };
    const tree = renderer
      .create(
        <BrowserRouter>
          <App>
            <Schedules />
          </App>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
