import React from "react";
import ReactDOM from "react-dom";
import SignupForm from "../components/SignupForm/SignupForm.js";
import renderer from "react-test-renderer";
import App from "../components/App/App";
import { BrowserRouter } from "react-router-dom";

describe("signup form route", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <App>
          <SignupForm />
        </App>
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders UI as expected", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <App>
            <SignupForm />
          </App>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
