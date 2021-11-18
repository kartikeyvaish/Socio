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

// Exports
export default chatReducer;
