// Imports
import * as actionTypes from "./actionTypes";

// Defining the initial State
const InitialState = {
  Profile: null,
};

// Defining the reducer for Posts

const profileReducer = (state = InitialState, action) => {
  switch (action.type) {
    // Set Profile
    case actionTypes.SET_PROFILE: {
      const myState = { ...state };
      myState.Profile = action.payload;
      return myState;
    }

    // Delete a Post from Profile.Posts array
    case actionTypes.DELETE_PROFILE_POST: {
      const myState = { ...state };

      let updatedPostsArray = myState.Profile.Posts.filter(
        (post) => post._id !== action.payload
      );

      myState.Profile.Posts = updatedPostsArray;

      return myState;
    }

    // Default
    default:
      return state;
  }
};

// Exports
export default profileReducer;
