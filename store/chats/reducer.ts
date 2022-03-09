// Imports
import * as actionTypes from "./actionTypes";
import { ChatsActionProps, ChatsInitialStateProps } from "./types";

// Defining the initial state
export const chatsInitialState: ChatsInitialStateProps = {
  chats: [],
};

// Reducers
const chatsReducer = (state = chatsInitialState, action: ChatsActionProps) => {
  switch (action.type) {
    // Set Chats
    case actionTypes.SET_CHATS:
      return {
        ...state,
        chats: action.payload.chats,
      };

    // add chat
    case actionTypes.ADD_CHAT: {
      let myState = { ...state };

      // Check if chat already exists
      let chatExists = myState.chats.findIndex(chat => chat._id === action.payload.chat._id);
      // if chat does not exist, add it in the beginning
      if (chatExists < 0) myState.chats.unshift(action.payload.chat);

      return myState;
    }

    // Remove Chat
    case actionTypes.DELETE_CHAT: {
      let myState = { ...state };

      // Remove the chat from the chats array
      myState.chats = myState.chats.filter(
        (chat) => chat._id !== action.payload.chat_id
      );

      return myState;
    }

    // Update Chat
    case actionTypes.UPDATE_CHAT: {
      let myState = { ...state };

      // check if the chat exists
      let chatIndex = myState.chats.findIndex(
        (chat) => chat._id === action.payload.chat_id
      );

      // if the chat exists
      if (chatIndex !== -1) {
        // update the chat
        myState.chats[chatIndex] = {
          ...myState.chats[chatIndex],
          ...action.payload.message,
        };
      }

      return myState;
    }

    // Mark a chat as read
    case actionTypes.MARK_AS_READ: {
      let myState = { ...state };

      // check if the chat exists
      let chatIndex = myState.chats.findIndex(
        (chat) => chat._id === action.payload.chat_id
      );

      if (chatIndex !== -1) {
        myState.chats[chatIndex].last_message = {
          ...myState.chats[chatIndex].last_message,
          read: true,
        }
      }

      return myState;
    }

    // Default
    default:
      return state;
  }
};

export default chatsReducer;
