/**
 * Import dependencies.
 */
import React, { createContext, useReducer } from "react";

// Create a context for a global state.
const StateContext = createContext();

// Create a provider for our global state.
const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

// Export the context and provider.
export { StateContext, StateProvider };
