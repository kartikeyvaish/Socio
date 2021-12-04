// Imports
import * as actionTypes from "./actionTypes";

// Defining the initial state
const InitialState = {
  overlayConfig: {
    visible: false,
    text: "Loading..",
  },
};

// Reducers

// Reducer for the Global States

const utilsReducer = (state = InitialState, action) => {
  switch (action.type) {
    // Set Overlay visibility
    case actionTypes.SET_OVERLAY: {
      const myState = { ...state };

      myState.overlayConfig = {
        ...myState.overlayConfig,
        ...action.payload,
      };

      return myState;
    }

    // Default
    default:
      return state;
  }
};

export default utilsReducer;
