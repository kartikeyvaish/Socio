// Imports
import * as actionTypes from "./actionTypes";

// Profile Action Creators
// Set Profile
export const SetProfile = (Profile) => ({
  type: actionTypes.SET_PROFILE,
  payload: Profile,
});

// Delete Post Profile Action Creators
export const DeleteProfilePost = (postId) => ({
  type: actionTypes.DELETE_PROFILE_POST,
  payload: postId,
});
