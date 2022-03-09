// Imports
import * as actionTypes from "./actionTypes";
import { FeedActionProps, FeedInitialStateProps } from "./types";

// Defining the initial state
const InitialState: FeedInitialStateProps = {
  FeedPosts: []
};

// Reducers
const feedReducer = (state = InitialState, action: FeedActionProps) => {
  switch (action.type) {

    // set the FeedPosts array
    case actionTypes.SET_FEED_POSTS: {
      const myState = { ...state };

      for (let i = 0; i < action.payload.posts.length; i++) {
        let findIndex = myState.FeedPosts.findIndex(
          (post) => post._id === action.payload.posts[i]._id
        );

        if (findIndex === -1) action.payload.posts[i] = { ...action.payload.posts[i], ...myState.FeedPosts[findIndex] };
      }

      myState.FeedPosts = action.payload.posts;
      return myState;
    }

    // Update the local uri of a file
    case actionTypes.UPDATE_LOCAL_URI: {
      const myState = { ...state };

      // find the post with the _id
      const postIndex = myState.FeedPosts.findIndex(post => post._id === action.payload._id);
      if (postIndex === -1) return myState;

      // update the local uri
      myState.FeedPosts[postIndex].local_uri = action.payload.local_uri;

      return myState;
    }

    // add posts to the starting of Feed Posts array
    case actionTypes.ADD_FEED_POSTS: {
      const myState = { ...state };
      // add new posts to starting of array
      myState.FeedPosts = [...myState.FeedPosts, ...action.payload.posts];
      return myState;
    }

    // Delete post from Feed Posts array
    case actionTypes.DELETE_POST_FROM_FEED: {
      const myState = { ...state };

      myState.FeedPosts = state.FeedPosts.filter(
        post => post._id !== action.payload._id
      );

      return myState;
    }

    // Like a post from Feed Posts array
    case actionTypes.LIKE_A_POST_FROM_FEED: {
      const myState = { ...state };

      const index = myState.FeedPosts.findIndex(
        post => post._id === action.payload._id
      );

      if (index !== -1) myState.FeedPosts[index].is_liked = true;

      return myState;
    }

    // Unlike a post from Feed Posts array
    case actionTypes.UNLIKE_A_POST_FROM_FEED: {
      const myState = { ...state };

      const index = myState.FeedPosts.findIndex(
        post => post._id === action.payload._id
      );

      if (index !== -1) myState.FeedPosts[index].is_liked = false;

      return myState;
    }

    // Update likes count 
    case actionTypes.UPDATE_LIKES_COUNT: {
      const myState = { ...state };

      const postIndex = myState.FeedPosts.findIndex(item => item._id === action.payload._id);
      if (postIndex === -1) return state;

      myState.FeedPosts[postIndex].likes_count = action.payload.likes_count;
      return myState;
    }

    // Update comments count
    case actionTypes.UPDATE_COMMENTS_COUNT: {
      const myState = { ...state };

      const postIndex = myState.FeedPosts.findIndex(item => item._id === action.payload._id);
      if (postIndex === -1) return state;

      myState.FeedPosts[postIndex].comments_count = action.payload.comments_count;
      return myState;
    }

    case actionTypes.LOGOUT: {
      return InitialState;
    }

    // Default
    default:
      return state;
  }
};

export default feedReducer;
