// Imports
import * as actionTypes from "./actionTypes";

// Profile Action Creators
// Set Profile
export const SetProfile = (Profile) => ({
  type: actionTypes.SET_PROFILE,
  payload: Profile,
});

// Add a post to Profile
export const AddPostToProfile = (post) => ({
  type: actionTypes.ADD_POST_TO_PROFILE,
  payload: post,
});

// Delete Post Profile Action Creators
export const DeleteProfilePost = (postId) => ({
  type: actionTypes.DELETE_PROFILE_POST,
  payload: postId,
});

// Reset the state
export const Reset = () => ({
  type: actionTypes.RESET,
});
