// Imports
import * as actionTypes from "./actionTypes";

// Chat Action Creators

// Set Chats
export const SetChats = (Chats, _id) => ({
  type: actionTypes.SET_CHATS,
  payload: {
    chats: Chats,
    user: _id,
  },
});

// Mark a chat as read
export const MarkChatAsRead = (chatId, user) => ({
  type: actionTypes.MARK_AS_READ,
  payload: { chatId, user },
});

// Create or Update a Chat
export const UpdateChat = (chatId, last_message, user) => ({
  type: actionTypes.UPDATE_CHAT,
  payload: {
    chatId,
    last_message,
    user,
  },
});

// Update Chat Messages for a chatId
export const UpdateChatMessages = (chatId, messages) => ({
  type: actionTypes.UPDATE_CHAT_MESSAGES,
  payload: {
    chatId,
    messages,
  },
});

// Reset the state
export const Reset = () => ({
  type: actionTypes.RESET,
});
