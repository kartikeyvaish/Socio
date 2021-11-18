import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import RecievedMessage from "../components/RecievedMessage";
import SendMessage from "../components/SendMessage";
import Text from "./../components/Text";

const BaseURL = config.URLs.BaseURL;
const deviceWidth = Dimensions.get("window").width;

function ChatRoom({ navigation, route, User }) {
  const socket = useRef(io(BaseURL));
  const VideoPlayer = useRef();
  const FLatListRef = useRef();
  const Skip = useRef(0);
  const [ChatThread, SetChatThread] = useState([]);
  const [Message, SetMessage] = useState("");
  const [Users, SetUsers] = useState(0);
  const [SelectedFile, SetSelectedFile] = useState(null);
  const [FullFile, SetFullFile] = useState(null);
  const [PreviewModal, SetPreviewModal] = useState(false);
  const [FullViewModal, SetFullViewModal] = useState(false);
  const [SendLoading, SetSendLoading] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [typing, Settyping] = useState(false);
  const { dark } = useTheme();

  const room = route?.params?.RoomID;

  const OwnerID = User._id;

  const RecieverID = route.params?.OtherUser?._id;
  const RecieverUsername = route.params?.OtherUser?.Username;
  const RecieverProfilePicture = route.params?.OtherUser?.ProfilePicture;

  // useLayoutEffect to update the user details in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <Pressable
          style={styles.NameAndPicHeaderBox}
          onPress={() =>
            navigation.navigate("PersonProfile", {
              title: RecieverUsername,
              _id: RecieverID,
            })
          }
        >
          <Avatar
            uri={RecieverProfilePicture}
            size={35}
            showOnlineButton={Users > 1 ? true : false}
            online={Users > 1 ? true : false}
          />
          <View>
            <Text
              text={RecieverUsername}
              family="InterBold"
              size={18}
              marginLeft={15}
            />
            <Text
              text={Users > 1 ? (typing ? "Typing..." : "Online") : "Offline"}
              size={13}
              marginLeft={15}
            />
          </View>
        </Pressable>
      ),
    });

    if (Users > 1) MarkAsReadUserUpdate();
  }, [navigation, Users, typing]);

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
        if (message.message === "start") Settyping(true);
        else Settyping(false);
      }
    });

    socket.current.on("roomUsers", ({ room, users }) => {
      if (Users !== users.length) SetUsers(users.length);
    });

    return () => socket.current.disconnect();
  }, []);

  // Whenever there is a change in ChatThread, then update the Skip count to its length
  useEffect(() => {
    Skip.current = ChatThread.length;
  }, [ChatThread]);

  // Wheneve the FullFile changes, update the preview modal
  useEffect(() => {
    if (FullFile !== null) SetFullViewModal(true);
  }, [FullFile]);

  // Update the other user that I am typing through socket
  useEffect(() => {
    if (Message.length) {
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
  }, [Message]);

  // Initial Load
  const InitialLoad = async () => {
    try {
      SetLoading(true);
      await GetMessages();
      await MarkAsRead();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // Get Messages in batches
  const GetMessages = async () => {
    try {
      const response = await API.GetMessages(room, Skip.current, User.Token);

      if (response.ok) {
        let length = response.data.Messages.length;
        if (length) {
          // let temp = _.unionBy(ChatThread, response.data.Messages, "_id");
          let temp = [...ChatThread, ...response.data.Messages];
          SetChatThread(temp);
        }
      }
    } catch (error) {}
  };

  // Mark the 0th element as Read when the other user opens the chat room
  const MarkAsReadUserUpdate = async () => {
    try {
      let temp = [...ChatThread];
      if (temp[0].user_id === OwnerID) {
        temp[0] = { ...temp[0], read: true };
        SetChatThread(temp);
      }
    } catch (error) {}
  };

  // API to call when I join the room
  const MarkAsRead = async () => {
    try {
      await API.MarkAsRead(room, User.Token);
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

        SetSelectedFile(previewFile);
        SetPreviewModal(true);
      }
    } catch (error) {}
  };

  // Remove an item from CHatThread array based on the _id
  const RemoveMessageBasedOnID = async (_id) => {
    try {
      const filter = ChatThread.filter((item) => item._id !== _id);

      SetChatThread(filter);
    } catch (error) {}
  };

  // Add an item to the CHatThread array
  const AddToChatThread = (data) => {
    SetChatThread((ChatThread) => {
      return [data].concat(ChatThread);
    });
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
      SetSelectedFile(null);
      SetPreviewModal(false);
      SetFullFile(null);
      SetFullViewModal(false);
      SetMessage("");
      if (VideoPlayer.current) await VideoPlayer.current.unloadAsync();
    } catch (error) {}
  };

  // Render the File Picked Preview Modal
  const RenderPreviewModal = () => (
    <Modal
      isVisible={PreviewModal}
      onBackButtonPress={ResetModal}
      animationInTiming={1}
      animationOutTiming={1}
      backdropColor={ColorPallete.black}
      backdropOpacity={1}
      style={{ padding: 0, margin: 0 }}
    >
      {SelectedFile ? (
        <View style={styles.FilePart}>
          <View style={{ width: deviceWidth }}>
            {SelectedFile.mimeName === "image" ? (
              <IMG
                source={{ uri: SelectedFile.uri }}
                style={styles.ImagePreview}
              />
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Video
                  ref={VideoPlayer}
                  source={{ uri: SelectedFile.uri }}
                  shouldPlay
                  isLooping
                  style={{ minWidth: deviceWidth, minHeight: deviceWidth }}
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
          onChangeText={(value) => SetMessage(value)}
          onSubmit={Send_File_Message}
          value={Message}
          showFilePicker={false}
          color="black"
          backgroundColor="white"
          Loading={SendLoading}
        />
      </View>
    </Modal>
  );

  // Render the modal which opens when the user clicks on the file message
  const RenderFullFileModal = () => (
    <Modal
      isVisible={FullViewModal}
      onBackButtonPress={ResetModal}
      animationInTiming={1}
      animationOutTiming={1}
      backdropColor={ColorPallete.black}
      backdropOpacity={1}
      style={{ padding: 0, margin: 0 }}
    >
      {FullFile ? (
        <View style={styles.FilePart}>
          <View style={{ width: deviceWidth }}>
            {FullFile.mime_type.slice(0, 5) === "image" ? (
              <IMG
                source={{ uri: FullFile.file }}
                style={styles.ImagePreview}
              />
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Video
                  ref={VideoPlayer}
                  source={{ uri: FullFile.file }}
                  style={{
                    minWidth: deviceWidth,
                    minHeight: deviceWidth,
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
            text={FullFile?.user_id === OwnerID ? "You" : RecieverUsername}
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

      const formData = new FormData();
      formData.append("room_id", room);
      formData.append("message", Message);
      formData.append("read", Users > 1 ? true : false);
      formData.append("message_type", "text");

      const temp_message = {
        _id: UniqueID,
        room_id: room,
        message: Message,
        message_datetime: moment(),
        user_id: OwnerID,
        reciever_id: RecieverID,
        message_type: "text",
        read: Users > 1 ? true : false,
      };

      AddToChatThread(temp_message);

      const response = await API.SendMessage(formData, User.Token);

      if (response.ok) SendToSocket(response.data);
      else {
        RemoveMessageBasedOnID(UniqueID);
        ToastAndroid.show(config.messages.ServerError, 3000);
      }

      SetMessage("");
    } catch (error) {
      ToastAndroid.show(config.messages.ServerError, 3000);
    }
  };

  // Send A File Message
  const Send_File_Message = async () => {
    try {
      SetSendLoading(true);
      Keyboard.dismiss();

      const formData = new FormData();
      formData.append("room_id", room);
      formData.append("message", Message);
      formData.append("read", Users > 1 ? true : false);
      formData.append("message_type", "file");

      let MimeType = Helper.GiveMimeType(SelectedFile.uri);
      let Preview = "";

      if (SelectedFile.mimeName === "image") {
        try {
          const response = await ImageManipulator.manipulateAsync(
            SelectedFile.uri,
            [],
            {
              compress: 0.3,
              format: "jpeg",
            }
          );
          Preview = response.uri;
        } catch (error) {}
      } else if (SelectedFile.mimeName === "video") {
        try {
          const response = await VideoThumbnails.getThumbnailAsync(
            SelectedFile.uri,
            {
              quality: 0.3,
            }
          );

          Preview = response.uri;
        } catch (error) {}
      }

      formData.append("file", {
        uri: SelectedFile.uri,
        name: "someFile." + Helper.GetExtension(SelectedFile.uri),
        type: MimeType,
      });

      formData.append("preview_file", {
        uri: Preview,
        name: "somePreviewFile." + Helper.GetExtension(SelectedFile.uri),
        type: MimeType,
      });

      const response = await API.SendMessage(formData, User.Token);
      if (response.ok) {
        AddToChatThread(response.data);
        SendToSocket(response.data);
      } else {
        ToastAndroid.show(config.messages.ServerError, 3000);
      }

      SetMessage("");
      SetPreviewModal(false);
      SetSendLoading(false);
    } catch (error) {
      SetPreviewModal(false);
      SetSendLoading(false);
    }
  };

  if (!OwnerID || !RecieverID || !room) {
    return null;
  }

  return (
    <Container backgroundColor={dark ? "#000000" : null}>
      {RenderPreviewModal()}

      {RenderFullFileModal()}

      {Loading ? (
        <LoadingScreen loadingText="Getting Chat.." />
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <FlatList
              data={ChatThread}
              ref={FLatListRef}
              onEndReached={ChatThread.length > 20 ? GetMessages : null}
              inverted
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item, index }) => (
                <>
                  {item.user_id === OwnerID ? (
                    <SendMessage
                      {...item}
                      onMessagePress={
                        item.message_type === "post"
                          ? () =>
                              navigation.navigate("PostDetails", {
                                _id: item.post_id,
                                title: "Posts",
                              })
                          : item.message_type === "file"
                          ? () => SetFullFile(item)
                          : null
                      }
                      showRead={index === 0 ? true : false}
                      topDate={Helper.GiveDateTopData(
                        item.message_datetime,
                        index + 1 === ChatThread.length
                          ? null
                          : ChatThread[index + 1].message_datetime
                      )}
                    />
                  ) : (
                    <RecievedMessage
                      {...item}
                      onMessagePress={
                        item.message_type === "post"
                          ? () =>
                              navigation.navigate("PostDetails", {
                                _id: item.post_id,
                                title: "Posts",
                              })
                          : item.message_type === "file"
                          ? () => SetFullFile(item)
                          : null
                      }
                      topDate={Helper.GiveDateTopData(
                        item.message_datetime,
                        index + 1 === ChatThread.length
                          ? null
                          : ChatThread[index + 1].message_datetime
                      )}
                    />
                  )}
                </>
              )}
            />
          </View>

          <KeyBoard
            onChangeText={(value) => SetMessage(value)}
            onSubmit={Message.length > 0 ? Send_Text_Message : null}
            onPickPress={PickFile}
            value={Message}
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

export default connect(mapStateToProps)(ChatRoom);

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
  PlayIcon: {
    backgroundColor: ColorPallete.white,
    borderRadius: 120,
  },
  PauseIcon: {
    backgroundColor: ColorPallete.primary,
    borderRadius: 120,
  },
  ImagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  Progress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});
