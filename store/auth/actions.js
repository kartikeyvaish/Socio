// Imports
import * as actionTypes from "./actionTypes";

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
