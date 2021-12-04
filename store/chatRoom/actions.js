// Imports
import * as actionTypes from "./actionTypes";

// Chat Action Creators

// Set ChatThread to an array
export const SetChatThread = (messages) => ({
  type: actionTypes.SET_CHAT_THREAD,
  payload: messages,
});

// Update Chat Thread for Chat Room
export const UpdateChatThread = (message) => ({
  type: actionTypes.UPDATE_CHAT_THREAD,
  payload: message,
});

// Set Message
export const SetMessage = (message) => ({
  type: actionTypes.SET_MESSAGE,
  payload: message,
});

// Set Users Count
export const SetUsersCount = (usersCount) => ({
  type: actionTypes.SET_USERS_COUNT,
  payload: usersCount,
});

// Set Selected file
export const SetSelectedFile = (file) => ({
  type: actionTypes.SET_SELECTED_FILE,
  payload: file,
});

// Set FullFile
export const SetFullFile = (file) => ({
  type: actionTypes.SET_FULL_FILE,
  payload: file,
});

// Set Preview Modal
export const SetPreviewModal = (visible) => ({
  type: actionTypes.SET_PREVIEW_MODAL,
  payload: visible,
});

// Set Full Modal
export const SetFullModal = (visible) => ({
  type: actionTypes.SET_FULL_MODAL,
  payload: visible,
});

// Set Loading
export const SetLoading = (loading) => ({
  type: actionTypes.SET_LOADING,
  payload: loading,
});

// Set Send Loading
export const SetSendLoading = (loading) => ({
  type: actionTypes.SET_SEND_LOADING,
  payload: loading,
});

// Set Typing
export const SetTyping = (typing) => ({
  type: actionTypes.SET_TYPING,
  payload: typing,
});

// Mark Message as Read
export const MarkMessageAsRead = (owner_id) => ({
  type: actionTypes.MARK_AS_READ,
  payload: owner_id,
});

// Update a Message Item
export const UpdateMessageItem = (message_id, message) => ({
  type: actionTypes.UPDATE_A_MESSAGE_ITEM,
  payload: {
    message_id,
    message,
  },
});

// Remove a Message Item
export const RemoveMessageItem = (message_id) => ({
  type: actionTypes.REMOVE_MESSAGE_ITEM,
  payload: message_id,
});
