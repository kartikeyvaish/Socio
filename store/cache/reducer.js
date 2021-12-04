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

    // Add to StorePosts and make sure array doesnt exceed 5
    case actionTypes.ADD_STORE_POST: {
      const myState = { ...state };
      myState.StorePosts = [action.payload, ...myState.StorePosts];

      // make sure only 5 posts are in the array
      if (myState.StorePosts.length > 5) myState.StorePosts.pop();

      return myState;
    }

    // Delete Store Posts by id
    case actionTypes.DELETE_STORE_POST: {
      const myState = { ...state };

      myState.StorePosts = myState.StorePosts.filter(
        (post) => post._id !== action.payload
      );

      return myState;
    }

    // Reset the state
    case actionTypes.RESET: {
      return InitialState;
    }

    // Default
    default:
      return state;
  }
};

// Exports
export default cacheReducer;
