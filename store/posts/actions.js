import * as actionTypes from "./actionTypes";

// Post Action Creators
// Set Posts
export const SetPosts = (Posts) => ({
  type: actionTypes.SET_POSTS,
  payload: Posts,
});

// Add Post
export const AddPost = (Post) => ({
  type: actionTypes.ADD_POST,
  payload: Post,
});

// Delete a post by _id
export const DeletePost = (_id) => ({
  type: actionTypes.DELETE_POST,
  payload: _id,
});

// Reset the state
export const Reset = () => ({
  type: actionTypes.RESET,
});
