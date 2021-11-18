// Imports
import * as actionTypes from "./actionTypes";

// Chat Action Creators

// Set Chats
export const SetChats = (Chats) => ({
  type: actionTypes.SET_CHATS,
  payload: Chats,
});
