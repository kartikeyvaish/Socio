import * as actionTypes from "./actionTypes";

// Cache Post Action Creators

// Set StorePosts
export const SetStorePosts = (StorePosts) => ({
  type: actionTypes.SET_STORE_POSTS,
  payload: StorePosts,
});

// Add to StorePosts
export const AddToStorePosts = (post) => ({
  type: actionTypes.ADD_STORE_POST,
  payload: post,
});

// Delete a post from the store
export const DeleteStorePost = (postId) => ({
  type: actionTypes.DELETE_STORE_POST,
  payload: postId,
});

// Reset state
export const Reset = () => ({
  type: actionTypes.RESET,
});
