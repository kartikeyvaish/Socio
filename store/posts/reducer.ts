import { ActionProps } from "../../types/StoreTypes";
import * as actionTypes from "./actionTypes";
import { PostsActionPayloadProps, PostsStoreStateProps } from "./types";

const INITIAL_STATE: PostsStoreStateProps = {
  feedPosts: [],
  usersPosts: [],
};

const postsReducer = (
  state = INITIAL_STATE,
  action: ActionProps<PostsActionPayloadProps>
) => {
  switch (action.type) {
    case actionTypes.PREPEND_FEED_POST: {
      let currentFeedPosts = [...state.feedPosts];

      currentFeedPosts.unshift(action.payload.feedPost);

      return { ...state, feedPosts: currentFeedPosts };
    }

    case actionTypes.APPEND_FEED_POST: {
      let currentFeedPosts = [...state.feedPosts];

      currentFeedPosts.push(action.payload.feedPost);

      return { ...state, feedPosts: currentFeedPosts };
    }

    case actionTypes.SET_FEED_POSTS:
      return {
        ...state,
        feedPosts: action.payload.feedPosts,
      };

    case actionTypes.REMOVE_FEED_POST: {
      const currentFeedPosts = [...state.feedPosts];

      const filteredFeedPosts = currentFeedPosts.filter(
        post => post.id !== action.payload.feedPostId
      );

      return { ...state, feedPosts: filteredFeedPosts };
    }

    case actionTypes.CLEAR_FEED_POSTS:
      return { ...state, feedPosts: [] };

    case actionTypes.PREPEND_USER_POST: {
      let currentUsersPosts = [...state.usersPosts];

      currentUsersPosts.unshift(action.payload.userPost);

      return { ...state, usersPosts: currentUsersPosts };
    }

    case actionTypes.APPEND_USER_POST: {
      let currentUsersPosts = [...state.usersPosts];

      currentUsersPosts.push(action.payload.userPost);

      return { ...state, usersPosts: currentUsersPosts };
    }

    case actionTypes.SET_USERS_POSTS:
      return { ...state, usersPosts: action.payload.usersPosts };

    case actionTypes.REMOVE_USER_POST: {
      const currentUsersPosts = [...state.usersPosts];

      const filteredUsersPosts = currentUsersPosts.filter(
        post => post.id !== action.payload.userPostId
      );

      return { ...state, usersPosts: filteredUsersPosts };
    }

    case actionTypes.CLEAR_USERS_POSTS:
      return { ...state, usersPosts: [] };

    default:
      return state;
  }
};

export default postsReducer;
