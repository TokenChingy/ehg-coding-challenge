/**
 * Import dependencies.
 */
import React, { useContext, useEffect } from "react";

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

  // Probably should do this further up the tree, but here will do.
  // Toggle the `dark` class on the body tag.
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  });

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
                {/* Light/Dark toggle */}
                <div
                  className="custom-form-control switch u-flex-ai-c"
                  style={{ margin: "auto 0" }}
                >
                  <input
                    id="dark-mode"
                    className="custom-form-input"
                    type="checkbox"
                    onChange={(event) => handleDarkMode()}
                  />
                  <label className="custom-form-label" htmlFor="dark-mode">
                    Light/Dark
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
