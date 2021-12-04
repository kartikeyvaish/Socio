// Imports
import * as actionTypes from "./actionTypes";

// Defining the initial State
const InitialState = {
  Chats: [],
  Unread: 0,
};

// Reducers

// Reducer for Chats
const chatReducer = (state = InitialState, action) => {
  switch (action.type) {
    // Set Chats
    case actionTypes.SET_CHATS: {
      const myState = { ...state };
      myState.Chats = action.payload.chats;

      // Count number of items in action.payload, whose last_message_details.read = false
      let unread = 0;
      myState.Chats.forEach((chat) => {
        if (chat.last_message_details?.user_id !== action.payload.user)
          if (chat?.last_message_details?.read === "false") unread++;
      });
      myState.Unread = unread;

      return myState;
    }

    // Mark a chat as Read
    case actionTypes.MARK_AS_READ: {
      const myState = { ...state };

      // Find the chat in the state
      const index = myState.Chats.findIndex(
        (chat) => chat._id === action.payload.chatId
      );

      if (index !== -1) {
        // Mark the chat as read
        if (
          myState.Chats[index].last_message_details?.user_id !==
          action.payload.user
        )
          myState.Chats[index].last_message_details.read = true;

        // Count number of items in action.payload, whose last_message_details.read = false
        let unread = 0;
        myState.Chats.forEach((chat) => {
          if (chat.last_message_details?.user_id !== action.payload.user)
            if (chat?.last_message_details?.read === "false") unread++;
        });

        myState.Unread = unread;
      }

      return myState;
    }

    // Update a chat based on chatId
    case actionTypes.UPDATE_CHAT: {
      const myState = { ...state };

      // Find the chat in the state
      const index = myState.Chats.findIndex(
        (chat) => chat._id === action.payload.chatId
      );

      // If the chat is found, update it
      if (index !== -1) {
        myState.Chats[index].last_message_details = action.payload.last_message;

        // Count number of items in action.payload, whose last_message_details.read = false
        let unread = 0;
        myState.Chats.forEach((chat) => {
          if (chat.last_message_details?.user_id !== action.payload.user)
            if (chat?.last_message_details?.read === "false") unread++;
        });

        myState.Unread = unread;
      }

      return myState;
    }

    // Update chat messages for a chatId
    case actionTypes.UPDATE_CHAT_MESSAGES: {
      const myState = { ...state };

      // Find the chat in the state
      const index = myState.Chats.findIndex(
        (chat) => chat._id === action.payload.chatId
      );

      // If the chat is found, update it
      if (index !== -1) {
        // Select only first 10 messages from action.payload.messages and assign to myState.Chats[index].messages
        myState.Chats[index].messages = action.payload.messages.slice(0, 10);
      }

      return myState;
    }

    // Reset state
    case actionTypes.RESET: {
      return InitialState;
    }

    // Default
    default:
      return state;
  }
};

// Exports
export default chatReducer;
