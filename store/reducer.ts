// Imports
import { combineReducers } from "@reduxjs/toolkit";

// Import reducers
import authReducer from "./auth/reducer";
import chatsReducer from "./chats/reducer";
import feedReducer from "./feed/reducer";
import profileReducer from "./profile/reducer";
import requestsReducer from "./requests/reducer";
import searchReducer from "./search/reducer";
import storiesReducer from "./stories/reducer";
import themeReducer from "./theme/reducer";

// Combining all the reducers and exporting
export default combineReducers({
    // Auth Reducer
    AuthState: authReducer,
    // Chats Reducer
    ChatsState: chatsReducer,
    // Feed Reducer
    FeedState: feedReducer,
    // Profile Reducer
    ProfileState: profileReducer,
    // Follow requests Reducer
    RequestsState: requestsReducer,
    // Search Reducer
    SearchState: searchReducer,
    // Stories Reducer
    StoriesState: storiesReducer,
    // Theme Reducer
    ThemeState: themeReducer,
});
