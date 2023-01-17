//settting up data layer
//for the need to track cart

import React, { createContext, useContext, useReducer } from 'react';

//The actual data layer
export const StateContext = createContext();

// Build a provider
export const StateProvider = ({ reducer, initialState, children }) => (
	<StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
