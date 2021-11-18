// Imports
import * as actionTypes from "./actionTypes";

// Defining the initial State
const InitialState = {
  StorePosts: [],
};

// Defining the reducer for Posts

const cacheReducer = (state = InitialState, action) => {
  switch (action.type) {
    // Set Store Posts
    case actionTypes.SET_STORE_POSTS: {
      const myState = { ...state };
      myState.StorePosts = action.payload;
      return myState;
    }

    // Default
    default:
      return state;
  }
};

// Exports
export default cacheReducer;
