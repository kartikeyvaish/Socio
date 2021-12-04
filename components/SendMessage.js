import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";

import ColorPallete from "../config/ColorPallete";
import Helper from "../config/Helper";
import Icon from "./Icon";
import Image from "./Image";
import Text from "./Text";
import TimeStamp from "./TimeStamp";

const ScreenWidth = Dimensions.get("screen").width;
const MaxCardWidth = ScreenWidth * 0.6;

function SendMessage({
  message = "",
  message_type,
  preview_file,
  mime_type = "image/jpg",
  message_datetime,
  onMessagePress,
  topDate = null,
  read = false,
  undelivered = false,
}) {
  const { colors, dark } = useTheme();

  const cardStyle = {
    ...styles.messageBox,
    backgroundColor: dark ? colors.background : "#EAEAEA",
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
        <View style={cardStyle}>
          {message_type === "file" ? (
            <View style={styles.ImageBox}>
              <Image
                uri={preview_file}
                resizeMode="cover"
                style={styles.Image}
                onPress={onMessagePress}
                borderRadius={10}
              />
              <TimeStamp
                style={styles.TimeStamp}
                time={Helper.GetTimeFromObject(message_datetime)}
                read={read}
              />
              {mime_type.slice(0, 5) === "video" ? (
                <Icon
                  Name="AntDesign"
                  IconName="play"
                  style={styles.PLayICon}
                  color={ColorPallete.primary}
                  size={30}
                  onPress={onMessagePress}
                />
              ) : null}
            </View>
          ) : null}

          {message ? <Text text={message} size={16} family="Inter" /> : null}

          {message_type === "text" ? (
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                marginTop: 3,
              }}
            >
              <Text
                text={Helper.GetTimeFromObject(message_datetime)}
                size={10}
                family="Inter"
                marginTop={5}
              />
              {undelivered ? (
                <Icon
                  Name="Ionicons"
                  IconName={"time-outline"}
                  color={colors.text}
                  size={17}
                  marginLeft={5}
                />
              ) : (
                <Icon
                  Name="Ionicons"
                  IconName={read ? "checkmark-done" : "checkmark"}
                  color={read ? ColorPallete.primary : colors.text}
                  size={17}
                  marginLeft={5}
                />
              )}
            </View>
          ) : null}
        </View>
      </View>
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
    maxWidth: MaxCardWidth,
    padding: 10,
    borderRadius: 10,
    elevation: 10,
  },
  TimeStamp: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  ImageBox: {
    width: MaxCardWidth - 20,
    height: MaxCardWidth - 20,
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: MaxCardWidth - 20,
    height: MaxCardWidth - 20,
  },
  PLayICon: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 120,
  },
});
