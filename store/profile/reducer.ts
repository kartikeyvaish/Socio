// types and utils imports
import * as actionTypes from "./actionTypes";
import { ProfileActionProps, ProfileInitialStateProps } from "./types";

// Defining the initial state
const InitialState: ProfileInitialStateProps = {
  ProfilePosts: [],
  FollowersCount: 0,
  FollowingCount: 0,
};

// Reducers

// Reducer for the profile
const profileReducer = (state = InitialState, action: ProfileActionProps) => {
  switch (action.type) {

    // Set Posts
    case actionTypes.SET_PROFILE_POSTS:
      return {
        ...state,
        ProfilePosts: action.payload.posts,
      };

    // Update the local uri of a file
    case actionTypes.UPDATE_LOCAL_URI: {
      const myState = { ...state };

      // find the post with the _id
      const postIndex = myState.ProfilePosts.findIndex(post => post._id === action.payload.post_id);
      if (postIndex === -1) return myState;

      // update the local uri
      myState.ProfilePosts[postIndex].local_uri = action.payload.local_uri;

      return myState;
    }

    // Add Post to ProfilePosts array if the post does not exist
    case actionTypes.ADD_PROFILE_POST:
      if (state.ProfilePosts.find((post) => post._id === action.payload.post._id)) {
        return state;
      } else {
        return {
          ...state,
          ProfilePosts: [action.payload.post, ...state.ProfilePosts],
        };
      }

    // Delete Post from ProfilePosts array  if the post exists
    case actionTypes.DELETE_PROFILE_POST:
      return {
        ...state,
        ProfilePosts: state.ProfilePosts.filter((post) => post._id !== action.payload.post_id),
      };

    // Set FollowersCount
    case actionTypes.SET_FOLLOWERS_COUNT:
      return {
        ...state,
        FollowersCount: action.payload.followersCount,
      };

    // Set FollowingCount
    case actionTypes.SET_FOLLOWING_COUNT:
      return {
        ...state,
        FollowingCount: action.payload.followingCount,
      };

    // Like a post from ProfilePosts array
    case actionTypes.LIKE_A_POST: {
      const myState = { ...state };

      const index = myState.ProfilePosts.findIndex(
        post => post._id === action.payload.post_id
      );

      if (index !== -1) myState.ProfilePosts[index].is_liked = true;

      return myState;
    }

    // Unlike a post from ProfilePosts array
    case actionTypes.UNLIKE_A_POST: {
      const myState = { ...state };

      const index = myState.ProfilePosts.findIndex(
        post => post._id === action.payload.post_id
      );

      if (index !== -1) myState.ProfilePosts[index].is_liked = false;

      return myState;
    }

    // Update likes count 
    case actionTypes.UPDATE_POST_LIKE_COUNT: {
      const myState = { ...state };

      const postIndex = myState.ProfilePosts.findIndex(item => item._id === action.payload.post_id);
      if (postIndex === -1) return state;

      myState.ProfilePosts[postIndex].likes_count = action.payload.likes_count;
      return myState;
    }

    // Update comments count
    case actionTypes.UPDATE_POST_COMMENT_COUNT: {
      const myState = { ...state };

      const postIndex = myState.ProfilePosts.findIndex(item => item._id === action.payload.post_id);
      if (postIndex === -1) return state;

      myState.ProfilePosts[postIndex].comments_count = action.payload.comments_count;
      return myState;
    }


    // Incase of Logout
    case actionTypes.LOGOUT: {
      return InitialState;
    }

    // Default
    default:
      return state;
  }
};

// Exports
export default profileReducer;
