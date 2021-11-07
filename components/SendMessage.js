import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";

import ColorPallete from "../config/ColorPallete";
import Helper from "../config/Helper";
import Icon from "./Icon";
import Image from "./Image";
import Text from "./Text";
import TimeStamp from "./TimeStamp";
import Avatar from "./Avatar";

const ScreenWidth = Dimensions.get("screen").width;

function SendMessage({
  message = "",
  message_type,
  preview_file,
  mime_type = "image/jpg",
  message_datetime,
  onMessagePress,
  post_details = {},
  topDate = null,
  read = false,
  showRead = false,
}) {
  const { colors, dark } = useTheme();

  const GiveFileMessage = () => {
    let key = mime_type.slice(0, 5);

    switch (key) {
      case "image":
        return (
          <View>
            <View style={styles.ImageBox}>
              <Image
                uri={preview_file}
                resizeMode="cover"
                style={styles.Image}
                onPress={onMessagePress}
              />
              <TimeStamp
                style={styles.TimeStamp}
                time={Helper.GetTimeFromObject(message_datetime)}
              />
            </View>
            {message ? (
              <Text text={message} size={16} family="Inter" marginTop={5} />
            ) : null}
          </View>
        );

      case "video":
        return (
          <View>
            <View style={styles.ImageBox}>
              <Image
                uri={preview_file}
                resizeMode="cover"
                style={styles.Image}
                onPress={onMessagePress}
              />
              <TimeStamp
                style={styles.TimeStamp}
                time={Helper.GetTimeFromObject(message_datetime)}
              />
              <Icon
                Name="AntDesign"
                IconName="play"
                style={styles.PLayICon}
                color={ColorPallete.primary}
                size={30}
                onPress={onMessagePress}
              />
            </View>
            {message ? (
              <Text text={message} size={16} family="Inter" marginTop={5} />
            ) : null}
          </View>
        );
      default:
        return null;
    }
  };

  const GivePostMessage = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Avatar size={30} uri={post_details.user_details.ProfilePicture} />
          <Text
            text={post_details.user_details.Name}
            size={16}
            family="InterBold"
            marginLeft={10}
          />
        </View>
        <View style={styles.ImageBox}>
          <Image
            uri={post_details.preview_file}
            resizeMode="cover"
            style={styles.Image}
            onPress={onMessagePress}
          />
        </View>
        {post_details.caption ? (
          <Text
            // Show only first 100 characters
            text={post_details.caption.slice(0, 100)}
            size={16}
            family="Inter"
            marginTop={5}
          />
        ) : null}
        <Text
          text={Helper.GetTimeFromObject(message_datetime)}
          size={13}
          family="Inter"
          marginTop={5}
          style={{ textAlign: "right" }}
        />
      </View>
    );
  };

  const GiveMessageBody = () => {
    switch (message_type) {
      case "text":
        return (
          <View>
            <Text text={message} size={16} family="Inter" />
            <Text
              text={Helper.GetTimeFromObject(message_datetime)}
              size={10}
              family="Inter"
              marginTop={5}
              style={{ textAlign: "right" }}
            />
          </View>
        );

      case "file":
        return <View>{GiveFileMessage()}</View>;

      case "post":
        return <View>{GivePostMessage()}</View>;

      default:
        return (
          <View>
            <Text text={message} size={16} family="Inter" />
            <Text
              text={Helper.GetTimeFromObject(message_datetime)}
              size={10}
              family="Inter"
              marginTop={5}
              style={{ textAlign: "right" }}
            />
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {topDate ? (
        <Text
          text={topDate}
          size={13}
          family="Inter"
          marginTop={10}
          marginBottom={10}
          style={{ textAlign: "center" }}
        />
      ) : null}

      <View style={{ alignItems: "flex-end" }}>
        <View
          style={{
            backgroundColor: dark ? colors.background : "#EAEAEA",
            ...styles.messageBox,
          }}
        >
          {GiveMessageBody()}
        </View>
      </View>

      {showRead ? (
        read ? (
          <View>
            <Text
              text={"read"}
              size={12}
              family="Inter"
              marginTop={10}
              marginBottom={10}
              style={{ textAlign: "right" }}
            />
          </View>
        ) : null
      ) : null}
    </View>
  );
}

export default SendMessage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
  },
  messageBox: {
    flexWrap: "wrap",
    maxWidth: ScreenWidth - 150,
    padding: 10,
    borderRadius: 10,
  },
  TimeStamp: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  ImageBox: {
    width: ScreenWidth - 150 - 20,
    height: ScreenWidth - 150 - 20,
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: ScreenWidth - 150 - 20,
    height: ScreenWidth - 150 - 20,
  },
  PLayICon: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 120,
  },
});
