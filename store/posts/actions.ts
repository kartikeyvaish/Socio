// Local Imports
import * as actionTypes from "./actionTypes";

// Named Imports
import { ActionProps } from "../../types/StoreTypes";
import { PostsActionPayloadProps } from "./types";
import { PostProps } from "../../types/AppTypes";

function setFeedPosts(
  feedPosts: Array<PostProps>
): ActionProps<PostsActionPayloadProps> {
  return {
    type: actionTypes.SET_FEED_POSTS,
    payload: { feedPosts },
  };
}

function appendFeedPost(
  feedPost: PostProps
): ActionProps<PostsActionPayloadProps> {
  return {
    type: actionTypes.APPEND_FEED_POST,
    payload: { feedPost },
  };
}

function prependFeedPost(
  feedPost: PostProps
): ActionProps<PostsActionPayloadProps> {
  return {
    type: actionTypes.PREPEND_FEED_POST,
    payload: { feedPost },
  };
}

function removeFeedPost(
  feedPostId: PostProps["id"]
): ActionProps<PostsActionPayloadProps> {
  return {
    type: actionTypes.REMOVE_FEED_POST,
    payload: { feedPostId },
  };
}

function clearFeedPosts(): ActionProps<PostsActionPayloadProps> {
  return {
    type: actionTypes.CLEAR_FEED_POSTS,
  };
}

function setUsersPosts(
  usersPosts: Array<PostProps>
): ActionProps<PostsActionPayloadProps> {
  return {
    type: actionTypes.SET_USERS_POSTS,
    payload: { usersPosts },
  };
}

function appendUserPost(
  userPost: PostProps
): ActionProps<PostsActionPayloadProps> {
  return {
    type: actionTypes.APPEND_USER_POST,
    payload: { userPost },
  };
}

function prependUserPost(
  userPost: PostProps
): ActionProps<PostsActionPayloadProps> {
  return {
    type: actionTypes.PREPEND_USER_POST,
    payload: { userPost },
  };
}

function removeUserPost(
  userPostId: PostProps["id"]
): ActionProps<PostsActionPayloadProps> {
  return {
    type: actionTypes.REMOVE_USER_POST,
    payload: { userPostId },
  };
}

function clearUsersPosts(): ActionProps<PostsActionPayloadProps> {
  return {
    type: actionTypes.CLEAR_USERS_POSTS,
  };
}

const postsActions = {
  setFeedPosts,
  prependFeedPost,
  removeFeedPost,
  setUsersPosts,
  prependUserPost,
  removeUserPost,
  appendFeedPost,
  appendUserPost,
  clearFeedPosts,
  clearUsersPosts,
};

export default postsActions;
