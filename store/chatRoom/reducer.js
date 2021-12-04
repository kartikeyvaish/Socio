// Imports
import * as actionTypes from "./actionTypes";

// Defining the initial State
export const chatRoomInitialState = {
  ChatThread: [],
  Message: "",
  Users: 0,
  SelectedFile: null,
  FullFile: null,
  PreviewModal: false,
  FullViewModal: false,
  SendLoading: false,
  Loading: false,
  typing: false,
};

// Reducers

// Reducer for Chats
const chatRoomReducer = (state = chatRoomInitialState, action) => {
  switch (action.type) {
    // Set Chats
    case actionTypes.SET_CHAT_THREAD: {
      const myState = { ...state };
      myState.ChatThread = action.payload;

      return myState;
    }

    // Update ChatThread
    case actionTypes.UPDATE_CHAT_THREAD: {
      const myState = { ...state };
      let temp = [action.payload].concat(myState.ChatThread);
      myState.ChatThread = temp;

      return myState;
    }

    // Set Message
    case actionTypes.SET_MESSAGE: {
      const myState = { ...state };
      myState.Message = action.payload;

      return myState;
    }

    // Set Users Count
    case actionTypes.SET_USERS_COUNT: {
      const myState = { ...state };
      myState.Users = action.payload;

      return myState;
    }

    // Set Selected file
    case actionTypes.SET_SELECTED_FILE: {
      const myState = { ...state };
      myState.SelectedFile = action.payload;

      return myState;
    }

    // Set Full File
    case actionTypes.SET_FULL_FILE: {
      const myState = { ...state };
      myState.FullFile = action.payload;

      return myState;
    }

    // Set Preview Modal
    case actionTypes.SET_PREVIEW_MODAL: {
      const myState = { ...state };
      myState.PreviewModal = action.payload;

      return myState;
    }

    // Set Full Modal
    case actionTypes.SET_FULL_MODAL: {
      const myState = { ...state };
      myState.FullViewModal = action.payload;

      return myState;
    }

    // Set Loading
    case actionTypes.SET_LOADING: {
      const myState = { ...state };
      myState.Loading = action.payload;

      return myState;
    }

    // Set Send Loading
    case actionTypes.SET_SEND_LOADING: {
      const myState = { ...state };
      myState.SendLoading = action.payload;

      return myState;
    }

    // Set Typing
    case actionTypes.SET_TYPING: {
      const myState = { ...state };
      myState.typing = action.payload;

      return myState;
    }

    // Mark messages as Read
    case actionTypes.MARK_AS_READ: {
      const myState = { ...state };

      for (let i = 0; i < myState.ChatThread.length; i++) {
        if (myState.ChatThread[i].user_id === action.payload) {
          myState.ChatThread[i].read = true;
        } else {
          break;
        }
      }

      return myState;
    }

    // Update a Message item based on _id
    case actionTypes.UPDATE_A_MESSAGE_ITEM: {
      const myState = { ...state };

      // Find the index of the message
      const index = myState.ChatThread.findIndex(
        (item) => item._id === action.payload.message_id
      );

      // Update the message
      if (index !== -1) {
        myState.ChatThread[index] = action.payload.message;
      }

      return myState;
    }

    // Remove a message item based on _id if it exists
    case actionTypes.REMOVE_MESSAGE_ITEM: {
      const myState = { ...state };

      // Find the index of the message
      const index = myState.ChatThread.findIndex(
        (item) => item._id === action.payload
      );

      // Remove the message
      if (index !== -1) {
        myState.ChatThread.splice(index, 1);

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
