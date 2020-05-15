/**
 * Import dependencies.
 */
import React, { useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { Footer } from "../components/Footer";
import { MainPage } from "../pages/MainPage";
import { NavBar } from "../components/NavBar";
import { NotFoundPage } from "../pages/NotFoundPage";
import { StateContext } from "../State";

/**
 * Define the MainLayout functional component.
 */
const MainLayout = () => {
  // Get the global state, including the dispatcher through the `useContext` hook.
  const [{ darkMode }] = useContext(StateContext);

  // Toggle the `dark` class on the body tag.
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  });

  // Normally this would have multiple page routes for this layout,
  // but there is only one usable page. The 404 handler is here instead,
  // as it uses the main layout.
  return (
    <React.Fragment>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
      <Footer />
    </React.Fragment>
  );
};

/**
 * Export the component.
 */
export { MainLayout };
