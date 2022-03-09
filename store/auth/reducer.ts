// Imports
import * as actionTypes from "./actionTypes";
import { AuthActionProps, AuthInitialStateProps } from "./types";

// Defining the initial state
const InitialState: AuthInitialStateProps = {
  User: null,
  PushToken: null,
};

// Reducers
const authReducer = (state = InitialState, action: AuthActionProps) => {
  switch (action.type) {
    // User Login
    case actionTypes.LOGIN: {
      const myState = { ...state };
      myState.User = action.payload.User;
      return myState;
    }

    // Update User
    case actionTypes.UPDATE_USER: {
      const myState = { ...state };
      myState.User = { ...state.User, ...action.payload.User };
      return myState;
    }

    // Update Push Token
    case actionTypes.UPDATE_PUSH_TOKEN: {
      const myState = { ...state };
      myState.PushToken = action.payload.PushToken;
      return myState;
    }

    // User Logout
    case actionTypes.LOGOUT: {
      const myState = { ...state };
      myState.User = null;
      return myState;
    }

    // Reset
    case actionTypes.RESET: {
      const myState = { ...state };
      myState.User = null;
      return myState;
    }

    // Default
    default:
      return state;
  }
};

export default authReducer;
