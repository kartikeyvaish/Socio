// Imports
import { Appearance } from "react-native";

import * as actionTypes from "./actionTypes";
import dark from "../../theme/Dark";
import light from "../../theme/Light";

// Getting the initial scheme
const defaultScheme = Appearance.getColorScheme();

// Defining the initial state
const InitialState = {
  Mode: defaultScheme || "light",
  Theme: defaultScheme === "dark" ? dark : light,
};

// Reducers

// Reducer for the theme
const themeReducer = (state = InitialState, action) => {
  switch (action.type) {
    // Theme Change
    case actionTypes.CHANGE_MODE: {
      const myState = { ...state };
      myState.Mode = action.payload;
      myState.Theme = action.payload === "dark" ? dark : light;
      return myState;
    }

    // Reset
    case actionTypes.RESET: {
      return InitialState;
    }

    // Default
    default:
      return state;
  }
};

// Exports
export default themeReducer;
