// Packages Imports
import { useContext, useEffect, useReducer, useRef } from "react";
import { FlatList } from "react-native";
import * as VideoThumbnails from "expo-video-thumbnails";

// Local Imports
import ChatsRoomActions from "../store/chatRoom/actions";
import chatRoomReducer, { chatRoomInitialState } from "../store/chatRoom/reducer";
import GlobalContext from "../context/GlobalContext";
import Helper from "../utils/Helper";
import { MessageProps } from "../store/chats/types";
import { SelectedFileProps } from "../types/HooksTypes";
import useAppEndpoints from "../api/useAppEndpoints";
import useSocket from "./useSocket";

// custom hook to encapsulate the flatlist logic
export default function useChatRoom({ chat_id }: { chat_id: string }) {
    // Local Refs
    const FLatListRef = useRef<FlatList>(null);
    const [state, dispatch] = useReducer(chatRoomReducer, chatRoomInitialState);
    const Skip = useRef(0);
    const { User } = useContext(GlobalContext)

    // Initialize Socket
    const { SendToSocket } = useSocket({
        message: state.message,
        onMessageArrive: data => AddToChatThread(data),
        onUsersCountUpdate: count => OtherUserEntered(count),
        owner_id: User._id,
        room_id: chat_id,
        onTypeStart: () => dispatch(ChatsRoomActions.SetTyping(true)),
        onTypeEnd: () => dispatch(ChatsRoomActions.SetTyping(false)),
    });

    // APIs
    const { GetMessages, MarkChatAsRead, } = useAppEndpoints();

    // Initial useEffect call
    useEffect(() => {
        InitialCall();
    }, []);

    // Changes in state.chat_thread
    useEffect(() => {
        Skip.current = state.chat_thread.length;
    }, [state.chat_thread]);


    // initial call
    const InitialCall = async () => {
        try {
            dispatch(ChatsRoomActions.SetLoading(true));
            await GetMessagesAPI();
            await MarkChatAsRead(chat_id);
            dispatch(ChatsRoomActions.SetLoading(false));
        } catch (error) {
            dispatch(ChatsRoomActions.SetLoading(false));
        }
    };

    // API call to get the chat thread
    const GetMessagesAPI = async () => {
        try {
            const apiResponse = await GetMessages(chat_id, Skip.current);

            if (apiResponse.ok) {
                if (apiResponse.data.messages.length) {
                    let payload = [...state.chat_thread, ...apiResponse.data.messages];
                    dispatch(ChatsRoomActions.SetChatThread(payload));
                }
            }
        } catch (error) { }
    };

    // Add an item to the CHatThread array
    const AddToChatThread = data => {
        dispatch(ChatsRoomActions.SetMessage(""));
        dispatch(ChatsRoomActions.UpdateChatThread(data));
    };

    // When other user enters, mark all your send messages as true
    const OtherUserEntered = count => {
        try {
            dispatch(ChatsRoomActions.SetOnlineUsersCount(count));
            if (count > 1) dispatch(ChatsRoomActions.MarkAsRead(User._id));
        } catch (error) { }
    };

    const CreateSocketPayload = async ({ selectedFile }: { selectedFile?: SelectedFileProps }) => {
        try {
            // generate a unique id for the message
            const temp_id = Helper.GenerateUniqueID();

            // get the current message and trim it.
            let new_message = state.message.trim();
            let newDateTime = new Date().toString();

            let socket_payload: MessageProps = {
                chat_id: chat_id,
                message: new_message,
                message_type: "text",
                sender_id: User._id,
                read: state.online_users > 1 ? true : false,
                _id: temp_id,
                message_datetime: newDateTime,
                delieverd: false,
            };

            if (selectedFile) {
                socket_payload.message_file = {
                    _id: temp_id,
                    uri: selectedFile.uri,
                    mimeType: Helper.get_mime_type(selectedFile.uri),
                    width: selectedFile.width ?? 0,
                    height: selectedFile.height ?? 0,
                    public_id: temp_id,
                };

                if (selectedFile.mimeType.slice(0, 5) === "video") {
                    const thumbnail = await VideoThumbnails.getThumbnailAsync(selectedFile.uri, {
                        time: 1000,
                    });

                    if (thumbnail.uri) {
                        socket_payload.thumbnail_image = {
                            _id: temp_id,
                            uri: thumbnail.uri,
                            mimeType: Helper.get_mime_type(thumbnail.uri),
                            width: selectedFile.width,
                            height: selectedFile.height,
                            public_id: temp_id,
                        };
                    }
                }

                socket_payload.message_type = Helper.get_file_type(selectedFile.uri);
            }

            return socket_payload;
        } catch (error) {
            return null;
        }
    };

    // return 
    return { FLatListRef, Skip, state, dispatch, GetMessagesAPI, SendToSocket, AddToChatThread, CreateSocketPayload };
}