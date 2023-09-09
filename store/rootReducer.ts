// Imports
import { combineReducers } from "@reduxjs/toolkit";

// Import reducers
import themeReducer from "./theme/reducer";

// Combining all the reducers and exporting
export default combineReducers({
    // contains the theme state for the app.
    theme: themeReducer,
});