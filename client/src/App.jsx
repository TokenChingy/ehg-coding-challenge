/**
 * Import dependencies.
 */
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { MainLayout } from "./layouts/MainLayout";
import React from "react";
import { StateProvider } from "./State";

/**
 * Define the App functional component.
 */
const App = () => {
  // Initiate the global state defaults.
  const initialState = {
    darkMode: JSON.parse(localStorage.getItem("darkMode")), // Get the state from localStorage, it's okay if it is undefined.
    imageHeight: 128,
    imageWidth: 256,
    orderingMethod: "hue",
  };

  // Define the reducers to mutate the global state.
  const reducer = (state, action) => {
    switch (action.type) {
      case "setDarkMode":
        // Set the state to localStorage.
        localStorage.setItem("darkMode", JSON.stringify(action.newDarkMode));

        return {
          ...state,
          darkMode: action.newDarkMode,
        };
      case "setImageHeight":
        return {
          ...state,
          imageHeight: action.newImageHeight,
        };
      case "setImageWidth":
        return {
          ...state,
          imageWidth: action.newImageWidth,
        };
      case "setOrderingMethod":
        return {
          ...state,
          orderingMethod: action.newOrderingMethod,
        };
      default:
        return state;
    }
  };

  // Return a provider for our global state wrapping a top-level
  // router, wrapping the main layout.
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <Switch>
          <Route component={MainLayout} />
        </Switch>
      </Router>
    </StateProvider>
  );
};

/**
 * Export the component.
 */
export { App };
