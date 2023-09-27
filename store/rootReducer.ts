// Imports
import { combineReducers } from "@reduxjs/toolkit";

// Import reducers
import authReducer from "./auth/reducer";
import globalReducer from "./global/reducer";
import postsReducer from "./posts/reducer";
import themeReducer from "./theme/reducer";

// Combining all the reducers and exporting
export default combineReducers({
  // contains the global state for the app.
  global: globalReducer,
  // contains the posts state for the app.
  posts: postsReducer,
  // contains the theme state for the app.
  theme: themeReducer,
  // contains the auth state for the app.
  auth: authReducer,
});
