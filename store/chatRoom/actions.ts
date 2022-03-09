// Types and Actions Imports
import { MessageProps } from "../chats/types";
import * as actionTypes from "./actionTypes";
import { ChatRoomActionType } from "./types";

// ChatsRoom Action Creators  

// function to set chat thread
function SetChatThread(chat_thread: Array<MessageProps>): ChatRoomActionType {
    return {
        type: actionTypes.SET_CHAT_THREAD,
        payload: {
            chat_thread,
        }
    }
}

// function to update chat thread
function UpdateChatThread(message_item: MessageProps): ChatRoomActionType {
    return {
        type: actionTypes.UPDATE_CHAT_THREAD,
        payload: {
            message_item,
        }
    }
}

// function to set message
function SetMessage(message: string): ChatRoomActionType {
    return {
        type: actionTypes.SET_MESSAGE,
        payload: {
            message,
        }
    }
}

// function to set online users count
function SetOnlineUsersCount(online_users: number): ChatRoomActionType {
    return {
        type: actionTypes.SET_USERS_COUNT,
        payload: {
            online_users,
        }
    }
}

// function to set loading
function SetLoading(loading: boolean): ChatRoomActionType {
    return {
        type: actionTypes.SET_LOADING,
        payload: {
            loading,
        }
    }
}

// funciton to set typing
function SetTyping(is_user_typing: boolean): ChatRoomActionType {
    return {
        type: actionTypes.SET_TYPING,
        payload: {
            is_user_typing,
        }
    }
}

// function to set send loading
function SetSendLoading(send_loading: boolean): ChatRoomActionType {
    return {
        type: actionTypes.SET_SEND_LOADING,
        payload: {
            send_loading,
        }
    }
}

// function to mark as read
function MarkAsRead(sender_id: string): ChatRoomActionType {
    return {
        type: actionTypes.MARK_AS_READ,
        payload: {
            sender_id,
        }
    }
}

// function to update a message item
function UpdateAMessageItem(message_item: MessageProps, message_id: string): ChatRoomActionType {
    return {
        type: actionTypes.UPDATE_A_MESSAGE_ITEM,
        payload: {
            message_item,
            message_id,
        }
    }
}

// function to remove a message item
function RemoveAMessageItem(message_id: string): ChatRoomActionType {
    return {
        type: actionTypes.REMOVE_MESSAGE_ITEM,
        payload: {
            message_id,
        }
    }
}

// Assemble ChatsRoom Actions
const ChatsRoomActions = {
    SetChatThread,
    UpdateChatThread,
    SetMessage,
    SetOnlineUsersCount,
    SetLoading,
    SetSendLoading,
    MarkAsRead,
    UpdateAMessageItem,
    RemoveAMessageItem,
    SetTyping
};

// Exports
export default ChatsRoomActions;