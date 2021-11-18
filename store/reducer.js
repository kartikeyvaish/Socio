// Imports
import { combineReducers } from "@reduxjs/toolkit";

// Importing all the reducers
import authReducer from "./auth/reducer";
import cacheReducer from "./cache/reducer";
import chatReducer from "./chats/reducer";
import postsReducer from "./posts/reducer";
import themeReducer from "./theme/reducer";
import profileReducer from "./profile/reducer";

// Combining all the reducers and exporting
export default combineReducers({
  // Auth reducer which has User and Push Token
  AuthState: authReducer,

  // Chats reducer which has Chats, Unread Count
  ChatsState: chatReducer,

  // Cache reducer which has StorePosts Cache
  CacheState: cacheReducer,

  // Posts reducer which has Posts
  PostsState: postsReducer,

  // Profile reducer which has Profile for the user
  ProfileState: profileReducer,

  // Theme reducer which has Theme for Navigation Container
  ThemeState: themeReducer,
});
