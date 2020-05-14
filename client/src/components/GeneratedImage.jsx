/**
 * Import dependencies.
 */
import React, { useContext, useEffect, useState } from "react";

import { StateContext } from "../State";

/**
 * Define the GeneratedImage functional component.
 */
const GeneratedImage = () => {
  // Define a local state for the image URL.
  const [imageUrl, setImageUrl] = useState("");

  // Get the global state through the `useContext` hook.
  const [{ imageHeight, imageWidth, orderingMethod }] = useContext(
    StateContext
  );

  // On an effect, query the backend to generate an image, expose the
  // global state variables to the hook.
  useEffect(() => {
    // Async functions need to be called within the hook.
    const getColours = async () => {
      // Clear the image URL, this will switch a ternary in the render
      // to display a loading circle in the event the backend takes more
      // time than normal.
      setImageUrl("");

      // Using the Fetch API, query the backend with a `POST` request.
      // Get the image dimensions and ordering method from the global state.
      // Await the response.
      const response = await fetch("/colours", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageHeight,
          imageWidth,
          orderingMethod,
        }),
      });

      // Decode the response as a `blob`.
      const data = await response.blob();

      // Make sure it's a png image.
      if (data.type === "image/png") {
        // Create a local URL to the blob data.
        const url = URL.createObjectURL(data);

        // Set the image URL state.
        setImageUrl(url);
      }
    };

    // Call the async function defined above.
    getColours();
  }, [imageHeight, imageWidth, orderingMethod]);

  return (
    <div className="container u-center-text">
      <div className="row">
        <div className="col">
          {/* Display the image if there is one else display a loading circle. */}
          {imageUrl !== "" ? (
            <img src={imageUrl} alt="32768" />
          ) : (
            <div className="progress-circle loading circle-turn">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle
                  className="progress-circle-value"
                  cx="40"
                  cy="40"
                  r="33"
                  fill="none"
                ></circle>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Export the component.
 */
export { GeneratedImage };
