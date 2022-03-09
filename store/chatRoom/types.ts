// Imports other types 
import { MessageProps } from "../chats/types";

export interface ChatRoomStateProps {
    chat_thread?: Array<MessageProps>;
    message?: string;
    online_users?: number;
    loading?: boolean;
    send_loading?: boolean;
    is_user_typing?: boolean;
}

// interface for ChatsActions
export interface ChatRoomActionType {
    type?: string;
    payload?: {
        chat_thread?: Array<MessageProps>;
        message?: string;
        online_users?: number;
        loading?: boolean;
        send_loading?: boolean;
        is_user_typing?: boolean;
        message_id?: string;
        message_item?: MessageProps;
        sender_id?: string
    };
} 
