/**
 * Import dependencies.
 */
import React from "react";

/**
 * Define the NotFound function component.
 */
const NotFoundPage = () => {
  // Self explanatory, displays a 404 not found message as a page.
  return (
    <div className="container u-center-text">
      <div className="row">
        <div className="col">
          <h1 className="heading">Page Not Found</h1>
          <h4 className="subheading">There aren't any colours here...</h4>
        </div>
      </div>
    </div>
  );
};

/**
 * Export the component.
 */
export { NotFoundPage };
