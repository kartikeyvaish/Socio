// Imports other types 

// chat user Props
export interface ChatUserProps {
    _id?: string;
    name?: string;
    username?: string;
    profile_picture?: string;
}

// interface for MessageProps 
export interface MessageProps {
    message?: string;
    _id?: string;
    chat_id?: string;
    sender_id?: string;
    message_type?: "text" | "image" | "video" | "audio";
    message_datetime?: string;
    read?: boolean;
    message_file?: {
        _id?: string;
        uri?: string;
        mimeType?: string;
        width?: number;
        height?: number;
        public_id?: string;
        duration?: number;
    };
    thumbnail_image?: {
        _id?: string;
        uri?: string;
        mimeType?: string;
        width?: number;
        height?: number;
        public_id?: string;
    };
    delieverd?: boolean;
}

export interface ChatItemProps {
    _id?: string;
    last_message?: MessageProps;
    updated_at?: string;
    chatting_with?: ChatUserProps
}

// interface for Chats IniitalState
export interface ChatsInitialStateProps {
    chats?: Array<ChatItemProps>;
}

// interface for ChatsActions
export interface ChatsActionProps {
    type?: string;
    payload?: {
        chats?: Array<ChatItemProps>;
        chat_id?: string;
        message?: MessageProps;
        chat?: ChatItemProps;
    };
}
