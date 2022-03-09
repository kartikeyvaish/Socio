// Imports
import * as actionTypes from "./actionTypes";
import { ThemeActionProps } from "./types";

// Action Creators for the theme

// Action Creators: Change theme state variable
function ChangeMode(mode: string): ThemeActionProps {
  return {
    type: actionTypes.CHANGE_MODE,
    payload: {
      mode: mode,
    }
  }
}

// Action Creators: Reset the state
function Reset(): ThemeActionProps {
  return {
    type: actionTypes.RESET,
  }
}

// Assemble ThemeActionCreators
const ThemeActionCreators = { ChangeMode, Reset }

// export the ThemeActionCreators
export default ThemeActionCreators;
