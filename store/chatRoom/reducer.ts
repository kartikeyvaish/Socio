// Imports
import * as actionTypes from "./actionTypes";
import { ChatRoomActionType, ChatRoomStateProps, } from "./types";

// Defining the initial State
export const chatRoomInitialState: ChatRoomStateProps = {
  chat_thread: [],
  message: "",
  online_users: 0,
  send_loading: false,
  loading: true,
  is_user_typing: false,
};

// Reducers

// Reducer for Chats
const chatRoomReducer = (state = chatRoomInitialState, action: ChatRoomActionType) => {
  switch (action.type) {
    // Set Chats
    case actionTypes.SET_CHAT_THREAD: {
      const myState = { ...state };
      myState.chat_thread = action.payload.chat_thread;

      return myState;
    }

    // Update chat_thread
    case actionTypes.UPDATE_CHAT_THREAD: {
      const myState = { ...state };

      let temp = [action.payload.message_item].concat(myState.chat_thread);
      myState.chat_thread = temp;

      return myState;
    }

    // Set message
    case actionTypes.SET_MESSAGE: {
      const myState = { ...state };

      myState.message = action.payload.message;

      return myState;
    }

    // Set online_users Count
    case actionTypes.SET_USERS_COUNT: {
      const myState = { ...state };
      myState.online_users = action.payload.online_users;

      return myState;
    }

    // Set loading
    case actionTypes.SET_LOADING: {
      const myState = { ...state };
      myState.loading = action.payload.loading;

      return myState;
    }

    // Set typing
    case actionTypes.SET_TYPING: {
      const myState = { ...state };

      myState.is_user_typing = action.payload.is_user_typing;

      return myState;
    }


    // Set Send loading
    case actionTypes.SET_SEND_LOADING: {
      const myState = { ...state };
      myState.send_loading = action.payload.send_loading;

      return myState;
    }

    // Mark messages as Read
    case actionTypes.MARK_AS_READ: {
      const myState = { ...state };

      for (let i = 0; i < myState.chat_thread.length; i++) {
        if (myState.chat_thread[i].sender_id === action.payload.sender_id) {
          myState.chat_thread[i].read = true;
        } else {
          break;
        }
      }

      return myState;
    }

    // Update a message item based on _id
    case actionTypes.UPDATE_A_MESSAGE_ITEM: {
      const myState = { ...state };

      // Find the index of the message
      const index = myState.chat_thread.findIndex(
        (item) => item._id === action.payload.message_id
      );

      // if payload.message contains _id, then delete _id property
      // not removing the _id, re renders the whole component
      // make sure to NOT UPDATE THE _id property
      if (action.payload.message_item)
        delete action.payload.message_item._id;

      // Update the message
      if (index !== -1)
        myState.chat_thread[index] = { ...myState.chat_thread[index], ...action.payload.message_item };

      return myState;
    }

    // Remove a message item based on _id if it exists
    case actionTypes.REMOVE_MESSAGE_ITEM: {
      const myState = { ...state };

      // Find the index of the message
      const index = myState.chat_thread.findIndex(
        (item) => item._id === action.payload.message_id
      );

      // Remove the message
      if (index !== -1) {
        myState.chat_thread.splice(index, 1);

        return myState;
      }

      return myState;
    }

    // Default
    default:
      return state;
  }
};

// Exports
export default chatRoomReducer;