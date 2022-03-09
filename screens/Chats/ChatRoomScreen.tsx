// Packages Imports
import { useEffect, useState } from "react";
import { FlatList, Keyboard, View } from "react-native";

// Local Imports
import AppContainer from "../../components/AppContainer";
import AppLoading from "../../components/AppLoading";
import { AppScreenProps } from "../../navigation/NavigationProps";
import ChatsKeyboard from "../../components/ChatKeyboard";
import ChatsRoomActions from "../../store/chatRoom/actions";
import Helper from "../../utils/Helper";
import MessageCard from "../../components/MessageCard";
import { MessageProps } from "../../store/chats/types";
import RecorderContainer from "../../components/RecorderContainer";
import ScreenNames from "../../navigation/ScreenNames";
import SelectFileModal from "../../components/SelectFileModal";
import { SelectedFileProps } from "../../types/HooksTypes";
import ToastMessages from "../../constants/Messages";
import TypingDots from "../../components/TypingDots";
import useAppEndpoints from "../../api/useAppEndpoints";
import useChatRoom from "../../hooks/useChatRoom";
import useDocumentPicker from "../../hooks/useDocumentPicker";
import useMessagePanHandler from "../../hooks/useMessagePanHandler";

// function component for ChatRoomScreen
function ChatRoomScreen(props: AppScreenProps<"ChatRoomScreen">) {
  // Destructuring props
  const { route, navigation } = props;

  // Route Parameters
  const chat_id = route?.params?.chat_id;

  // Custom Hooks
  const { gestureHandler, animatedStyle } = useMessagePanHandler();

  // custom hook to use the chat room
  // send messages to socket
  // maintains a local state
  // adds messgaes to chat
  // creates sokcet payload
  const {
    FLatListRef,
    state,
    GetMessagesAPI,
    dispatch,
    SendToSocket,
    AddToChatThread,
    CreateSocketPayload,
  } = useChatRoom({ chat_id });

  // custom hook to pick documents
  const { PickDocument, selectedFile, unselectFile } = useDocumentPicker({});

  const [RecordOverlay, SetRecordOverlay] = useState(false);

  // send messages api
  const { SendMessage } = useAppEndpoints();

  // whenveer navigation or loading changes, update the header
  useEffect(() => {
    navigation.setOptions({
      headerShown: state.loading ? false : true,
    });
  }, [navigation, state.loading]);

  // api call to send message
  const SendMessageAPI = async (uri?: string) => {
    let temp_id: string;
    SetRecordOverlay(false);

    try {
      let messageFile: SelectedFileProps = null;

      if (uri) {
        messageFile = {};
        messageFile.uri = uri;
        messageFile.mimeType = Helper.get_mime_type(uri);
        messageFile.fileName = Helper.get_file_name(uri);
      }

      // prepare a socket payload
      const socket_payload = await CreateSocketPayload({
        selectedFile: messageFile ? messageFile : selectedFile,
      });

      // Dimsiss the keyboard and bring the Flatlist to the bottom
      Keyboard.dismiss();
      FLatListRef.current.scrollToOffset({ animated: false, offset: 0 });

      // if message type is text, and message is empty, return
      if (socket_payload.message_type === "text" && socket_payload.message.length === 0) return;

      temp_id = socket_payload._id;

      // prepare the api payload
      const api_payload: any = new FormData();
      api_payload.append("chat_id", socket_payload.chat_id);
      api_payload.append("message", socket_payload.message);
      api_payload.append("read", socket_payload.read);

      if (socket_payload.message_file) {
        api_payload.append("message_file", {
          uri: socket_payload.message_file.uri,
          type: socket_payload.message_file.mimeType,
          name: Helper.get_file_name(socket_payload.message_file.uri),
        });
      }

      if (socket_payload.thumbnail_image) {
        api_payload.append("thumbnail_image", {
          uri: socket_payload.thumbnail_image.uri,
          type: socket_payload.thumbnail_image.mimeType,
          name: Helper.get_file_name(socket_payload.thumbnail_image.uri),
        });
      }

      // unselect the file if selected..
      if (socket_payload.message_type !== "text") unselectFile();

      // Add a message to current user's chat thread
      AddToChatThread(socket_payload);

      // Call API
      const response = await SendMessage(api_payload);

      // if response is ok, send the message to the socket
      // otherwise delete the message from chat thread
      if (response.ok) {
        if (state.online_users > 1) SendToSocket(response.data.new_message);

        let updated_message: MessageProps = { ...response.data.new_message, delieverd: true };
        dispatch(ChatsRoomActions.UpdateAMessageItem(updated_message, temp_id));
      } else {
        dispatch(ChatsRoomActions.RemoveAMessageItem(temp_id));
        Helper.ShowToast(response.data.message);
      }
    } catch (error) {
      // Show Toast in case of error
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      dispatch(ChatsRoomActions.RemoveAMessageItem(temp_id));
    }
  };

  // Render Item Function
  const renderItem = ({ item, index }) => (
    <MessageCard
      gestureHandler={gestureHandler}
      animatedStyle={animatedStyle}
      upper_date={Helper.get_top_date(
        item.message_datetime,
        index + 1 === state.chat_thread.length
          ? null
          : state.chat_thread[index + 1].message_datetime
      )}
      onVideoMessagePress={() =>
        navigation.navigate(ScreenNames.VideoPlayerScreen, { uri: item.message_file.uri })
      }
      onImageMessagePress={() =>
        navigation.navigate(ScreenNames.ImageViewerScreen, { uri: item.message_file.uri })
      }
      showRead={index === 0}
      {...item}
    />
  );

  // render
  return (
    <AppContainer>
      {state.loading ? (
        <AppLoading loadingText="Getting Messages.." visible={true} />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={state.chat_thread}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            ref={FLatListRef}
            onEndReachedThreshold={0.5}
            onEndReached={GetMessagesAPI}
            inverted
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          />

          <SelectFileModal
            visible={selectedFile !== null}
            onBackButtonPress={unselectFile}
            onDismiss={unselectFile}
            selectedFile={selectedFile}
            keyboardProps={{
              onChangeText: text => dispatch(ChatsRoomActions.SetMessage(text)),
              value: state.message,
              controlled: true,
              onFileSendPress: () => SendMessageAPI(),
            }}
          />

          {state.is_user_typing ? <TypingDots /> : null}

          {RecordOverlay ? (
            <RecorderContainer
              onDeletePress={() => {
                SetRecordOverlay(false);
              }}
              onSendPress={SendMessageAPI}
              containerVisible={RecordOverlay}
            />
          ) : null}

          <ChatsKeyboard
            onChangeText={text => dispatch(ChatsRoomActions.SetMessage(text))}
            value={state.message}
            onSendPress={() => SendMessageAPI()}
            onImagePickerPress={PickDocument}
            onMicrophonePress={() => SetRecordOverlay(true)}
            keyboardVisible={!RecordOverlay}
          />
        </View>
      )}
    </AppContainer>
  );
}

// exports
export default ChatRoomScreen;
