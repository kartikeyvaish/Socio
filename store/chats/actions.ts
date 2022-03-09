// Types and Actions Imports
import * as actionTypes from "./actionTypes";
import { ChatItemProps, ChatsActionProps, MessageProps } from "./types";

// Chats Action Creators 

// function to set chats
const SetChats = (chats: Array<ChatItemProps>): ChatsActionProps => {
    return {
        type: actionTypes.SET_CHATS,
        payload: {
            chats: chats,
        },
    };
};

// function to add chat
const AddChat = (chat: ChatItemProps): ChatsActionProps => {
    return {
        type: actionTypes.ADD_CHAT,
        payload: {
            chat: chat,
        },
    };
};

// function to remove chat
const DeleteChat = (chat_id: string): ChatsActionProps => {
    return {
        type: actionTypes.DELETE_CHAT,
        payload: {
            chat_id: chat_id,
        },
    };
};

// function to update chat
const UpdateChat = (chat_id: string, message: MessageProps): ChatsActionProps => {
    return {
        type: actionTypes.UPDATE_CHAT,
        payload: {
            chat_id, message,
        },
    };
};

// Mark chat as read
const MarkChatAsRead = (chat_id: string): ChatsActionProps => {
    return {
        type: actionTypes.MARK_AS_READ,
        payload: {
            chat_id,
        },
    };
};


// Assemble Chats Actions
const ChatsActions = {
    SetChats,
    DeleteChat,
    UpdateChat,
    AddChat,
    MarkChatAsRead
};

// Exports
export default ChatsActions;