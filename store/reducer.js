import { Appearance } from "react-native";

import * as actionTypes from "./actionTypes";

const defaultScheme = Appearance.getColorScheme();
const InitialState = {
  User: null,
  Mode: defaultScheme,
  PushToken: null,
  Posts: [],
  StorePosts: [],
  Profile: null,
  Chats: [],
  Unread: 0,
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    // Theme Change
    case actionTypes.TOGGLE_MODE: {
      const myState = { ...state };
      myState.Mode = action.Mode;
      return myState;
    }

    // User Login
    case actionTypes.LOGIN: {
      const myState = { ...state };
      myState.User = action.payload;
      return myState;
    }

    // Update User
    case actionTypes.UPDATE_USER: {
      const myState = { ...state };
      myState.User = { ...myState.User, ...action.payload };
      return myState;
    }

    // User Logout
    case actionTypes.LOGOUT: {
      return InitialState;
    }

    // Update Push Token
    case actionTypes.UPDATE_PUSH_TOKEN: {
      const myState = { ...state };
      myState.PushToken = action.payload;
      return myState;
    }

    // Set Posts
    case actionTypes.SET_POSTS: {
      const myState = { ...state };
      myState.Posts = action.payload;
      return myState;
    }

    // Set Store Posts
    case actionTypes.SET_STORE_POSTS: {
      const myState = { ...state };
      myState.StorePosts = action.payload;
      return myState;
    }

    // Set Posts
    case actionTypes.ADD_POST: {
      const myState = { ...state };
      myState.Posts = [action.payload, ...myState.Posts];
      return myState;
    }

    // Delete Post
    case actionTypes.DELETE_POST: {
      const myState = { ...state };

      myState.Posts = myState.Posts.filter(
        (post) => post._id !== action.payload
      );

      myState.StorePosts = myState.StorePosts.filter(
        (post) => post._id !== action.payload
      );

      let newPosts = myState.Profile?.Posts?.filter(
        (post) => post._id !== action.payload
      );
      myState.Profile.Posts = newPosts;
      myState.Profile.PostsCount = newPosts?.length;

      return myState;
    }

    // Set Profile
    case actionTypes.SET_PROFILE: {
      const myState = { ...state };
      myState.Profile = action.payload;
      return myState;
    }

    // Set Chats
    case actionTypes.SET_CHATS: {
      const myState = { ...state };
      myState.Chats = action.payload;

      // Count number of items in action.payload, whose last_message_details.read = false
      let unread = 0;
      myState.Chats.forEach((chat) => {
        if (chat?.last_message_details?.read === "false") unread++;
      });
      myState.Unread = unread;

      return myState;
    }

    // Default
    default:
      return state;
  }
};

export default reducer;
