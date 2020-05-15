/**
 * Import dependencies.
 */
import React, { useContext } from "react";

import { StateContext } from "../State";

/**
 * Define the NavBar functional component.
 */
const NavBar = () => {
  // Get the global state, including the dispatcher through the `useContext` hook.
  const [{ darkMode }, dispatch] = useContext(StateContext);

  // Handle when the dark mode toggle is clicked.
  // Dispatch to update the global state.
  const handleDarkMode = () => {
    dispatch({
      type: "setDarkMode",
      newDarkMode: !darkMode,
    });
  };

  return (
    <header className="navbar" style={{ marginBottom: "3.2rem" }}>
      <div className="container">
        <div className="navbar-logo">
          <h4 className="navbar-logo-link">32,768</h4>
        </div>

        <div className="navbar-content">
          <nav>
            <ul className="nav">
              <li className="nav-item">
                {/* Light/Dark toggle, persists with localStorage */}
                <div
                  className="custom-form-control switch u-flex-ai-c"
                  style={{ margin: "auto 0" }}
                >
                  <input
                    id="dark-mode"
                    className="custom-form-input"
                    type="checkbox"
                    onChange={(event) => handleDarkMode()}
                    checked={!darkMode}
                  />
                  <label className="custom-form-label" htmlFor="dark-mode">
                    Dark/Light
                  </label>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

/**
 * Export the component.
 */
export { NavBar };
