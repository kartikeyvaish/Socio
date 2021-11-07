// Imports
import apiClient from "./client";

// Chats Endpoints
const get_chats_for_user = "/chats/get-chats-for-user";
const get_messages = "/chats/get-messages";
const send_messages = "/chats/send-message";
const mark_as_read = "/chats/mark-as-read";
const create_chat = "/chats/create-chat";

// API functions
const GetChats = (Token) =>
  apiClient.get(
    get_chats_for_user,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );

const GetMessages = (room_id, skip = 0, Token) =>
  apiClient.get(
    get_messages,
    { room_id: room_id, skip: skip },
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );

const SendMessage = (DATA, Token) =>
  apiClient.post(send_messages, DATA, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

const MarkAsRead = (room_id, Token) =>
  apiClient.put(
    mark_as_read,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      data: { room_id: room_id },
    }
  );

const CreateNewChat = (DATA, Token) =>
  apiClient.post(create_chat, DATA, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

// Exports
export default {
  GetChats,
  GetMessages,
  SendMessage,
  MarkAsRead,
  CreateNewChat,
};
