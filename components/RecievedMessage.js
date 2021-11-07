import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import config from "../config/config";
import ColorPallete from "../config/ColorPallete";
import Helper from "../config/Helper";
import Icon from "./Icon";
import Image from "./Image";
import Text from "./Text";
import TimeStamp from "./TimeStamp";
import Avatar from "./Avatar";

const ScreenWidth = Dimensions.get("screen").width;

function RecievedMessage({
  message = "",
  message_type,
  preview_file,
  mime_type = "image/jpg",
  topDate = null,
  message_datetime,
  onMessagePress,
  post_details = {},
}) {
  const GiveFileMessage = () => {
    let key = mime_type.slice(0, 5);

    switch (key) {
      case "image":
        return (
          <View style={styles.MessageBox}>
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
              <View>
                <Text text={message} size={16} family="Inter" marginTop={5} />
              </View>
            ) : null}
          </View>
        );

      case "video":
        return (
          <View style={styles.MessageBox}>
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
              <View>
                <Text text={message} size={16} family="Inter" marginTop={5} />
              </View>
            ) : null}
          </View>
        );
      default:
        return null;
    }
  };

  const GiveMessageBody = () => {
    switch (message_type) {
      case "text":
        return (
          <View style={styles.MessageBox}>
            <Text text={message} size={16} family="Inter" />
            <View>
              <Text
                text={Helper.GetTimeFromObject(message_datetime)}
                size={10}
                family="Inter"
                marginTop={5}
                style={{ textAlign: "right" }}
              />
            </View>
          </View>
        );

      case "file":
        return <View>{GiveFileMessage()}</View>;

      case "post":
        return <View>{GivePostMessage()}</View>;

      default:
        return (
          <View style={styles.MessageBox}>
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

  const GivePostMessage = () => {
    if (post_details) {
      return (
        <View
          style={{
            borderWidth: 1,
            borderColor: "grey",
            padding: 5,
            borderRadius: 12,
          }}
        >
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
    }

    return null;
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

      <View style={{ alignItems: "flex-start" }}>{GiveMessageBody()}</View>
    </View>
  );
}

export default RecievedMessage;

const styles = StyleSheet.create({
  container: { width: "100%", padding: 5, maxWidth: ScreenWidth - 150 },
  MessageBox: {
    flexWrap: "wrap",
    maxWidth: ScreenWidth - 150,
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
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
    marginBottom: 5,
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
