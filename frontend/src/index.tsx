import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/App";
import { userStore } from "./store/user";

const root = document.querySelector("#root");
ReactDOM.render(
  <Provider store={userStore}>
    <App />
  </Provider>,
  root
);
