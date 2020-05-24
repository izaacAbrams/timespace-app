import React from "react";
import ReactDOM from "react-dom";
import ApptCard from "../components/ApptCard/ApptCard.js";
import renderer from "react-test-renderer";

describe("apptcard component", () => {
  it("renders test appointment", () => {
    const div = document.createElement("div");
    const appt = {
      name: "Test Appt",
      appt_date_time: new Date().toISOString(),
      service: "Test",
    };
    ReactDOM.render(<ApptCard appt={appt} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders the UI as expected", () => {
    const appt = {
      name: "Test Appt",
      appt_date_time: new Date("2029-01-22T16:28:32.615Z").toISOString(),
      service: "Test",
    };
    const tree = renderer.create(<ApptCard appt={appt} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
