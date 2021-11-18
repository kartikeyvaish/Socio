// Imports
import * as actionTypes from "./actionTypes";

// Defining the initial State
const InitialState = {
  Posts: [],
};

// Defining the reducer for Posts

const postsReducer = (state = InitialState, action) => {
  switch (action.type) {
    // Set Posts
    case actionTypes.SET_POSTS: {
      const myState = { ...state };
      myState.Posts = action.payload;
      return myState;
    }

    // Set Store Posts
    case actionTypes.SET_STORE_POSTS: {
      const myState = { ...state };
      myState.StorePosts = action.payload;
      return myState;
    }

    // Set Posts
    case actionTypes.ADD_POST: {
      const myState = { ...state };
      myState.Posts = [action.payload, ...myState.Posts];
      return myState;
    }

    // Delete Post
    case actionTypes.DELETE_POST: {
      const myState = { ...state };

      myState.Posts = myState.Posts.filter(
        (post) => post._id !== action.payload
      );

      return myState;
    }

    // Default
    default:
      return state;
  }
};

// Exports
export default postsReducer;
