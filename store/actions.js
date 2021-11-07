import * as actionTypes from "./actionTypes";

// Theme Action Creators
// To  Change Theme
export const ToggleMode = (colorScheme) => ({
  type: actionTypes.TOGGLE_MODE,
  Mode: colorScheme,
});

// --------------------------------------------------

// Auth Action Creators
// Login User
export const Login = (User) => ({
  type: actionTypes.LOGIN,
  payload: User,
});

// Update User
export const UpdateUser = (User) => ({
  type: actionTypes.UPDATE_USER,
  payload: User,
});

// Update Push Token for User
export const UpdatePushToken = (PushToken) => ({
  type: actionTypes.UPDATE_PUSH_TOKEN,
  payload: PushToken,
});

// Logout User
export const Logout = () => ({
  type: actionTypes.LOGOUT,
});

// --------------------------------------------------

// Post Action Creators
// Set Posts
export const SetPosts = (Posts) => ({
  type: actionTypes.SET_POSTS,
  payload: Posts,
});

// Set StorePosts
export const SetStorePosts = (StorePosts) => ({
  type: actionTypes.SET_STORE_POSTS,
  payload: StorePosts,
});

// Add Post
export const AddPost = (Post) => ({
  type: actionTypes.ADD_POST,
  payload: Post,
});

// Delete a post by _id
export const DeletePost = (_id) => ({
  type: actionTypes.DELETE_POST,
  payload: _id,
});

// --------------------------------------------------

// Profile Action Creators
// Set Profile
export const SetProfile = (Profile) => ({
  type: actionTypes.SET_PROFILE,
  payload: Profile,
});

// --------------------------------------------------
// Chat Action Creators
// Set Chats
export const SetChats = (Chats) => ({
  type: actionTypes.SET_CHATS,
  payload: Chats,
});

// --------------------------------------------------
// Unread Action Creators
// Set Unread
export const SetUnread = (Unread) => ({
  type: actionTypes.SET_UNREAD,
  payload: Unread,
});
