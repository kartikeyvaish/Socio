import * as actionTypes from "./actionTypes";

// Cache Post Action Creators

// Set StorePosts
export const SetStorePosts = (StorePosts) => ({
  type: actionTypes.SET_STORE_POSTS,
  payload: StorePosts,
});
