/**
 * Import dependencies.
 */
import { App } from "./App";
import React from "react";
import ReactDOM from "react-dom";

/**
 * Render the React component `App` to the DOM by binding
 * it to an element with the id of `root`.
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);
