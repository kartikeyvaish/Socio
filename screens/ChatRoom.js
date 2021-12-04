// Packages import
import React, { useEffect, useLayoutEffect, useReducer, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Keyboard,
  Image as IMG,
  ToastAndroid,
  Dimensions,
  Pressable,
} from "react-native";
import _ from "lodash";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import * as DocumentPicker from "expo-document-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useTheme } from "@react-navigation/native";
import { Video } from "expo-av";

// components, APIs, and functions
import API from "../api/API";
import Avatar from "./../components/Avatar";
import config from "../config/config";
import Container from "../components/Container";
import ColorPallete from "../config/ColorPallete";
import Helper from "../config/Helper";
import Icon from "../components/Icon";
import KeyBoard from "../components/KeyBoard";
import LoadingScreen from "../components/LoadingScreen";
import Modal from "react-native-modal";
import moment from "moment";
import Text from "./../components/Text";

// Imports from Chat Room Store
// Initial State and Reducer
import chatRoomReducer, {
  chatRoomInitialState,
} from "../store/chatRoom/reducer";

// Action Creators
import { MarkChatAsRead, UpdateChat } from "../store/chats/actions";
import {
  MarkMessageAsRead,
  SetChatThread,
  SetFullFile,
  SetFullModal,
  SetLoading,
  SetMessage,
  SetPreviewModal,
  SetSelectedFile,
  SetSendLoading,
  SetTyping,
  SetUsersCount,
  RemoveMessageItem,
  UpdateChatThread,
  UpdateMessageItem,
} from "../store/chatRoom/actions";
import MessageCard from "../components/MessageCard";
import ScreenNames from "../navigation/ScreenNames";

// Constants
const BaseURL = config.URLs.BaseURL;
const ScreenWidth = Dimensions.get("window").width;

function ChatRoom({
  navigation,
  route,
  User,
  MarkChatAsRead,
  UpdateChat,
  MarkMessageRead,
}) {
  // theme for the application
  const { dark } = useTheme();

  // useRefs for the chat room
  const socket = useRef(io(BaseURL));
  const VideoPlayer = useRef();
  const FLatListRef = useRef();
  const Skip = useRef(0);

  // reducer for the chat room
  const [state, dispatch] = useReducer(chatRoomReducer, chatRoomInitialState);

  // owner_id for the chat room
  const OwnerID = User._id;

  // Route Parameters
  const room = route?.params?.RoomID;
  const RecieverID = route.params?.OtherUser?._id;
  const RecieverUsername = route.params?.OtherUser?.Username;
  const RecieverProfilePicture = route.params?.OtherUser?.ProfilePicture;

  // useEffect which gets executed when the component mounts
  useEffect(() => {
    InitialLoad();
  }, []);

  // Socket Initialization
  useEffect(() => {
    socket.current.emit("joinRoom", { OwnerID, room });

    socket.current.on("message", (message) => {
      if (message.user_id !== OwnerID) AddToChatThread(message);
    });

    socket.current.on("type-update-emitter", (message) => {
      if (message.typer !== OwnerID) {
        if (message.message === "start") dispatch(SetTyping(true));
        else dispatch(SetTyping(false));
      }
    });

    socket.current.on("roomUsers", ({ room, users }) => {
      if (state.Users !== users.length) dispatch(SetUsersCount(users.length));
    });

    return () => socket.current.disconnect();
  }, []);

  // useLayoutEffect to update the user details in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <Pressable
          style={styles.NameAndPicHeaderBox}
          onPress={() =>
            navigation.navigate(ScreenNames.PersonProfile, {
              title: RecieverUsername,
              _id: RecieverID,
            })
          }
        >
          <Avatar
            uri={RecieverProfilePicture}
            size={35}
            showOnlineButton={state.Users > 1 ? true : false}
            online={state.Users > 1 ? true : false}
          />
          <View>
            <Text
              text={RecieverUsername}
              family="InterBold"
              size={18}
              marginLeft={15}
            />
            {state.Users > 1 ? (
              <Text
                text={state.typing ? "Typing..." : "Online"}
                size={13}
                marginLeft={15}
              />
            ) : null}
          </View>
        </Pressable>
      ),
    });

    if (state.Users > 1) dispatch(MarkMessageRead(OwnerID));
  }, [navigation, state.Users, state.typing, OwnerID]);

  // To update the chat last message when user leaves the screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      UpdateChat(room, state.ChatThread[0], OwnerID);
    });

    return unsubscribe;
  }, [navigation, state.ChatThread, OwnerID, room]);

  // Whenever there is a change in ChatThread, then update the Skip count to its length
  useEffect(() => {
    Skip.current = state.ChatThread.length;
  }, [state.ChatThread]);

  // Wheneve the FullFile changes, update the preview modal
  useEffect(() => {
    if (state.FullFile !== null) dispatch(SetFullModal(true));
  }, [state.FullFile]);

  // Update the other user that I am typing through socket
  useEffect(() => {
    if (state.Message.length) {
      if (socket.current) {
        socket.current.emit("type-update", {
          message: `start`,
          typer: OwnerID,
        });
      }
    }

    const timeout = setTimeout(() => {
      if (socket.current) {
        socket.current.emit("type-update", {
          message: `stop`,
          typer: OwnerID,
        });
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [state.Message]);

  // Initial Load
  const InitialLoad = async () => {
    try {
      dispatch(SetLoading(true));
      await GetMessages();
      await MarkAsRead();
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
    }
  };

  // Get Messages in batches
  const GetMessages = async () => {
    try {
      const response = await API.GetMessages(room, Skip.current, User.Token);

      if (response.ok) {
        if (response.data.Messages.length)
          dispatch(
            SetChatThread([...state.ChatThread, ...response.data.Messages])
          );
      }
    } catch (error) {}
  };

  // API to call when I join the room
  const MarkAsRead = async () => {
    try {
      await API.MarkAsRead(room, User.Token);
      MarkChatAsRead(room, OwnerID);
    } catch (error) {}
  };

  // function to pick a file
  const PickFile = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({ type: "*/*" });

      if (response.type === "success") {
        const previewFile = { ...response };
        previewFile.mimeName = Helper.GiveMimeName(response.name);
        previewFile.mime_type = Helper.GiveMimeType(response.name);
        if (response.uri.startsWith("file")) previewFile.uri = response.uri;
        else previewFile.uri = "file://" + response.uri;

        dispatch(SetSelectedFile(previewFile));
        dispatch(SetPreviewModal(true));
      }
    } catch (error) {}
  };

  // Add an item to the CHatThread array
  const AddToChatThread = (data) => {
    dispatch(UpdateChatThread(data));
  };

  // Fucntoin to send a message to the socket to other user
  const SendToSocket = async (data) => {
    try {
      if (socket.current) {
        socket.current.emit("chatMessage", data);
      }
    } catch (error) {}
  };

  // Reset the states
  const ResetModal = async () => {
    try {
      dispatch(SetSelectedFile(null));
      dispatch(SetPreviewModal(false));
      dispatch(SetFullFile(null));
      dispatch(SetFullModal(false));
      dispatch(SetMessage(""));
      if (VideoPlayer.current) await VideoPlayer.current.unloadAsync();
    } catch (error) {}
  };

  // Render the File Picked Preview Modal
  const RenderPreviewModal = () => (
    <Modal
      isVisible={state.PreviewModal}
      onBackButtonPress={ResetModal}
      animationInTiming={1}
      animationOutTiming={1}
      backdropColor={ColorPallete.black}
      backdropOpacity={1}
      style={{ padding: 0, margin: 0 }}
    >
      {state.SelectedFile ? (
        <View style={styles.FilePart}>
          <View style={{ width: ScreenWidth }}>
            {state.SelectedFile.mimeName === "image" ? (
              <IMG
                source={{ uri: state.SelectedFile.uri }}
                style={styles.ImagePreview}
              />
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Video
                  ref={VideoPlayer}
                  source={{ uri: state.SelectedFile.uri }}
                  shouldPlay
                  isLooping
                  style={{ minWidth: ScreenWidth, minHeight: ScreenWidth }}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
        </View>
      ) : null}

      <View style={styles.HeaderBar}>
        <View style={styles.Icon}>
          <Icon
            Name="Ionicons"
            IconName="arrow-back"
            size={30}
            onPress={ResetModal}
            color="white"
          />
          <Text
            text="You"
            marginLeft={20}
            size={22}
            family="InterBold"
            color="white"
          />
        </View>
      </View>

      <View style={{ width: "100%", position: "absolute", bottom: 20 }}>
        <KeyBoard
          onChangeText={(value) => dispatch(SetMessage(value))}
          onSubmit={Send_File_Message}
          value={state.Message}
          showFilePicker={false}
          color="black"
          backgroundColor="white"
          Loading={state.SendLoading}
        />
      </View>
    </Modal>
  );

  // Render the modal which opens when the user clicks on the file message
  const RenderFullFileModal = () => (
    <Modal
      isVisible={state.FullViewModal}
      onBackButtonPress={ResetModal}
      animationInTiming={1}
      animationOutTiming={1}
      backdropColor={ColorPallete.black}
      backdropOpacity={1}
      style={{ padding: 0, margin: 0 }}
    >
      {state.FullFile ? (
        <View style={styles.FilePart}>
          <View style={{ width: ScreenWidth }}>
            {state.FullFile.mime_type.slice(0, 5) === "image" ? (
              <IMG
                source={{ uri: state.FullFile.file }}
                style={styles.ImagePreview}
              />
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Video
                  ref={VideoPlayer}
                  source={{ uri: state.FullFile.file }}
                  style={{
                    minWidth: ScreenWidth,
                    minHeight: ScreenWidth,
                  }}
                  shouldPlay
                  isLooping
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
        </View>
      ) : (
        <View></View>
      )}

      <View style={styles.HeaderBar}>
        <View style={styles.Icon}>
          <Icon
            Name="Ionicons"
            IconName="arrow-back"
            size={30}
            onPress={ResetModal}
            color="white"
          />
          <Text
            text={
              state.FullFile?.user_id === OwnerID ? "You" : RecieverUsername
            }
            marginLeft={20}
            size={22}
            family="InterBold"
            color="white"
          />
        </View>
      </View>
    </Modal>
  );

  // Send A Text Message
  const Send_Text_Message = async () => {
    try {
      const UniqueID = Helper.GenerateUniqueID();
      Keyboard.dismiss();
      FLatListRef.current.scrollToOffset({ animated: false, offset: 0 });

      dispatch(SetMessage(""));

      const formData = new FormData();
      formData.append("room_id", room);
      formData.append("message", state.Message.trim());
      formData.append("read", state.Users > 1 ? true : false);
      formData.append("message_type", "text");

      const temp_message = {
        _id: UniqueID,
        room_id: room,
        message: state.Message.trim(),
        message_datetime: moment(),
        user_id: OwnerID,
        reciever_id: RecieverID,
        message_type: "text",
        read: state.Users > 1 ? true : false,
        undelivered: true,
      };

      AddToChatThread(temp_message);

      const response = await API.SendMessage(formData, User.Token);

      if (response.ok) {
        SendToSocket(response.data);
        dispatch(UpdateMessageItem(UniqueID, response.data));
      } else {
        dispatch(RemoveMessageItem(UniqueID));
        ToastAndroid.show(config.messages.ServerError, 3000);
      }
    } catch (error) {
      ToastAndroid.show(config.messages.ServerError, 3000);
    }
  };

  // Send A File Message
  const Send_File_Message = async () => {
    try {
      dispatch(SetSendLoading(true));
      Keyboard.dismiss();
      FLatListRef.current.scrollToOffset({ animated: false, offset: 0 });

      const formData = new FormData();
      formData.append("room_id", room);
      formData.append("message", state.Message.trim());
      formData.append("read", state.Users > 1 ? true : false);
      formData.append("message_type", "file");

      let MimeType = Helper.GiveMimeType(state.SelectedFile.uri);
      let Preview = "";

      if (state.SelectedFile.mimeName === "image") {
        try {
          const response = await ImageManipulator.manipulateAsync(
            state.SelectedFile.uri,
            [],
            {
              compress: 0.3,
              format: "jpeg",
            }
          );
          Preview = response.uri;
        } catch (error) {}
      } else if (state.SelectedFile.mimeName === "video") {
        try {
          const response = await VideoThumbnails.getThumbnailAsync(
            state.SelectedFile.uri,
            {
              quality: 0.3,
            }
          );

          Preview = response.uri;
        } catch (error) {}
      }

      formData.append("file", {
        uri: state.SelectedFile.uri,
        name: "someFile." + Helper.GetExtension(state.SelectedFile.uri),
        type: MimeType,
      });

      formData.append("preview_file", {
        uri: Preview,
        name: "somePreviewFile." + Helper.GetExtension(state.SelectedFile.uri),
        type: MimeType,
      });

      const response = await API.SendMessage(formData, User.Token);
      if (response.ok) {
        AddToChatThread(response.data);
        SendToSocket(response.data);
      } else {
        ToastAndroid.show(config.messages.ServerError, 3000);
      }

      dispatch(SetMessage(""));
      dispatch(SetPreviewModal(false));
      dispatch(SetSendLoading(false));
    } catch (error) {
      dispatch(SetMessage(""));
      dispatch(SetPreviewModal(false));
      dispatch(SetSendLoading(false));
    }
  };

  // if any props missing then return null
  if (!OwnerID || !RecieverID || !room) return null;

  return (
    <Container backgroundColor={dark ? "#000000" : null}>
      {RenderPreviewModal()}

      {RenderFullFileModal()}

      {state.Loading ? (
        <LoadingScreen loadingText="Getting Chat.." />
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <FlatList
              data={state.ChatThread}
              ref={FLatListRef}
              onEndReached={GetMessages}
              inverted
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item, index }) => (
                <>
                  <MessageCard
                    OwnerID={OwnerID}
                    user_id={item.user_id}
                    props={{ ...item }}
                    onMessagePress={
                      item.message_type === "post"
                        ? () =>
                            navigation.navigate(ScreenNames.PostDetails, {
                              _id: item.post_id,
                              title: "Posts",
                            })
                        : item.message_type === "file"
                        ? () => dispatch(SetFullFile(item))
                        : null
                    }
                    topDate={Helper.GiveDateTopData(
                      item.message_datetime,
                      index + 1 === state.ChatThread.length
                        ? null
                        : state.ChatThread[index + 1].message_datetime
                    )}
                  />
                </>
              )}
            />
          </View>

          <KeyBoard
            onChangeText={(value) => dispatch(SetMessage(value))}
            onSubmit={state.Message.length > 0 ? Send_Text_Message : null}
            onPickPress={PickFile}
            value={state.Message}
            backgroundColor={dark ? "black" : null}
          />
        </>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    MarkChatAsRead: (room_id, user) => dispatch(MarkChatAsRead(room_id, user)),
    UpdateChat: (room_id, user) => dispatch(UpdateChat(room_id, user)),
    MarkMessageRead: (room_id, user) =>
      dispatch(MarkMessageAsRead(room_id, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);

const styles = StyleSheet.create({
  NameAndPicHeaderBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  FilePart: {
    flex: 1,
    justifyContent: "center",
  },
  HeaderBar: {
    width: "100%",
    position: "absolute",
    backgroundColor: ColorPallete.black,
    top: 0,
    height: 50,
  },
  Icon: {
    height: 50,
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
  },
  ImagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
