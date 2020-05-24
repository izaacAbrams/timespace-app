import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "../routes/LoginPage/LoginPage.js";
import renderer from "react-test-renderer";
import App from "../components/App/App";
import { BrowserRouter } from "react-router-dom";

describe("login page route", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <App>
          <LoginPage />
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
            <LoginPage />
          </App>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
