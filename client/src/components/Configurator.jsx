/**
 * Import dependencies.
 */
import React, { useContext } from "react";

import { StateContext } from "../State";

/**
 * Define the Configurator functional component.
 */
const Configurator = () => {
  // Get the global state, including the dispatcher through the `useContext` hook.
  const [{ imageHeight, imageWidth, orderingMethod }, dispatch] = useContext(
    StateContext
  );

  // Function the mutate the global state to update the `imageHeight`
  // and `imageWidth`.
  const setImageDimensions = (newHeight, newWidth) => {
    dispatch({
      type: "setImageHeight",
      newImageHeight: newHeight,
    });

    dispatch({
      type: "setImageWidth",
      newImageWidth: newWidth,
    });
  };

  // `onChange` handler to set the new image dimensions.
  const handleDimension = (event, dimension) => {
    const newDimension = parseInt(event.target.value);

    // Since there are only 28 possible image sizes, we need to
    // ensure that those sizes are met or else the image returned
    // will not have exactly 32768 unique colours.
    if (dimension === "height") {
      setImageDimensions(newDimension, 32768 / newDimension);
    } else if (dimension === "width") {
      setImageDimensions(32768 / newDimension, newDimension);
    }
  };

  // `onChange` handler to mutate the global state to update the `orderingMethod`.
  const setOrderingMethod = (value) => {
    dispatch({
      type: "setOrderingMethod",
      newOrderingMethod: value,
    });
  };

  // To de-clutter the JSX, and also since the width and height share the same
  // options, we'll function this to generate the options for the selects below.
  const renderDivisors = () => {
    return (
      <React.Fragment>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="32">32</option>
        <option value="64">64</option>
        <option value="128">128</option>
        <option value="256">256</option>
        <option value="512">512</option>
        <option value="1024">1024</option>
        <option value="2048">2048</option>
        <option value="4096">4096</option>
        <option value="8192">8192</option>
        <option value="16384">16384</option>
      </React.Fragment>
    );
  };

  // Render the configurator form.
  return (
    <form>
      <div className="container">
        <fieldset>
          {/* Legend */}
          <div className="row">
            <div className="col">
              <legend>
                <h5 className="heading">Configure Image</h5>
              </legend>
            </div>
          </div>

          {/* Height Selector */}
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="height-selector">Height</label>
                <select
                  id="height-selector"
                  value={imageHeight}
                  onChange={(event) => handleDimension(event, "height")}
                >
                  {renderDivisors()}
                </select>
              </div>
            </div>

            {/* Width Selector */}
            <div className="col">
              <div className="form-group">
                <label htmlFor="width-selector">Width</label>
                <select
                  id="width-selector"
                  value={imageWidth}
                  onChange={(event) => handleDimension(event, "width")}
                >
                  {renderDivisors()}
                </select>
              </div>
            </div>

            {/* Ordering Method Selector */}
            <div className="col">
              <div className="form-group">
                <label htmlFor="ordering-selector">Ordering</label>
                <select
                  id="ordering-selector"
                  value={orderingMethod}
                  onChange={(event) => setOrderingMethod(event.target.value)}
                >
                  <option value="none">None</option>
                  <option value="hue">Hue</option>
                  <option value="luminesce">Luminesce</option>
                  <option value="saturation">Saturation</option>
                  <option value="noise">Noise</option>
                </select>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </form>
  );
};

/**
 * Export the component.
 */
export { Configurator };
