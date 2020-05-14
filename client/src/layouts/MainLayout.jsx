/**
 * Import dependencies.
 */
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { Footer } from "../components/Footer";
import { MainPage } from "../pages/MainPage";
import { NavBar } from "../components/NavBar";
import { NotFoundPage } from "../pages/NotFoundPage";
import React from "react";

/**
 * Define the MainLayout functional component.
 */
const MainLayout = () => {
  // Normally this would have multiple page routes for this layout,
  // but there is only one usable page. The 404 handler is here instead,
  // as it uses the main layout.
  return (
    <React.Fragment>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
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
