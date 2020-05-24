import React from "react";
import ReactDOM from "react-dom";
import LandingPage from "../routes/LandingPage/LandingPage.js";
import renderer from "react-test-renderer";
import App from "../components/App/App";
import { BrowserRouter } from "react-router-dom";

describe("apptcard component", () => {
  it("renders landing page", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <App>
          <LandingPage />
        </App>
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <App>
            <LandingPage />
          </App>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
