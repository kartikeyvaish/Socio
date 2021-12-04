// Imports
import * as actionTypes from "./actionTypes";

// Action Creators

// Action Creators: Change theme state variable
export const ChangeMode = (Mode) => ({
  type: actionTypes.CHANGE_MODE,
  payload: Mode,
});

// Action Creators: Reset the state
export const Reset = () => ({
  type: actionTypes.RESET,
});
