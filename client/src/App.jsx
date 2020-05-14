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
    darkMode: true,
    imageHeight: 256,
    imageWidth: 128,
    orderingMethod: "hue",
  };

  // Define the reducers to mutate the global state.
  const reducer = (state, action) => {
    switch (action.type) {
      case "setDarkMode":
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
          <Route>
            <MainLayout />
          </Route>
        </Switch>
      </Router>
    </StateProvider>
  );
};

/**
 * Export the component.
 */
export { App };
