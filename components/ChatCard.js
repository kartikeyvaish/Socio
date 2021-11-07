import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TouchableRipple } from "react-native-paper";

import Avatar from "./Avatar";
import Helper from "../config/Helper";
import Text from "./Text";

const ScreenWidth = Dimensions.get("screen").width;

function ChatCard({
  chatting_with,
  last_message_details,
  onPress,
  onLongPress,
  current_user,
}) {
  return (
    <TouchableRipple onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.container}>
        <Avatar
          uri={chatting_with.ProfilePicture}
          size={50}
          showBorder={false}
        />

        <View style={styles.NameUsername}>
          <Text
            text={chatting_with.Username ? chatting_with.Username : null}
            size={16}
            family={
              last_message_details.user_id === current_user
                ? "Inter"
                : last_message_details.read === false
                ? "Inter"
                : "InterBold"
            }
          />
          <Text
            text={
              last_message_details.message
                ? last_message_details.message
                : last_message_details.message_type === "file"
                ? "Sent you a file"
                : last_message_details.message_type === "post"
                ? "Sent a Post"
                : "Tap to send a message"
            }
            numberOfLines={1}
            family={
              last_message_details.user_id === current_user
                ? "Inter"
                : last_message_details.read === false
                ? "Inter"
                : "InterBold"
            }
          />
        </View>

        {last_message_details.message_datetime ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              text={
                last_message_details.message_datetime
                  ? Helper.MessageTimeAgo(last_message_details.message_datetime)
                  : ""
              }
              family={
                last_message_details.user_id === current_user
                  ? "Inter"
                  : last_message_details.read === false
                  ? "Inter"
                  : "InterBold"
              }
              size={13}
            />
          </View>
        ) : null}
      </View>
    </TouchableRipple>
  );
}

export default ChatCard;

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 25,
  },
  NameUsername: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 50,
  },
  Username: {
    fontSize: 16,
    marginLeft: 15,
  },
  LastMessage: {
    marginLeft: 15,
    width: "50%",
  },
  Time: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
