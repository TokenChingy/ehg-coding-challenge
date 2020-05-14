/**
 * Import dependencies.
 */
import { Configurator } from "../components/Configurator";
import { GeneratedImage } from "../components/GeneratedImage";
import React from "react";

/**
 * Define the MainPage function component.
 */
const MainPage = () => {
  // The page is made up of core components to the web application.
  // The Configurator component and the GeneratedImage component.
  return (
    <React.Fragment>
      <Configurator />
      <GeneratedImage />
    </React.Fragment>
  );
};

/**
 * Export the component.
 */
export { MainPage };
