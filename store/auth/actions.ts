// Types and Actions Imports
import * as actionTypes from "./actionTypes";
import { AuthActionProps, UserProps } from "./types";

// Auth Action Creators
// Login User
const Login = (User: UserProps): AuthActionProps => ({
  type: actionTypes.LOGIN,
  payload: {
    User,
  },
});

// Update User
const UpdateUser = (User: UserProps): AuthActionProps => ({
  type: actionTypes.UPDATE_USER,
  payload: {
    User,
  },
});

// Update Push Token for User
const UpdatePushToken = (PushToken: string): AuthActionProps => ({
  type: actionTypes.UPDATE_PUSH_TOKEN,
  payload: {
    PushToken,
  },
});

// Logout User
const Logout = (): AuthActionProps => ({
  type: actionTypes.LOGOUT,
});

// Assemble Auth Actions
const AuthActionCreators = {
  Login,
  UpdateUser,
  Logout,
  UpdatePushToken
};

// Exports
export default AuthActionCreators;