import * as actionTypes from "./actionTypes";

// Post Action Creators
// Set Posts
export const SetPosts = (Posts) => ({
  type: actionTypes.SET_POSTS,
  payload: Posts,
});

// Set StorePosts
export const SetStorePosts = (StorePosts) => ({
  type: actionTypes.SET_STORE_POSTS,
  payload: StorePosts,
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
