import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ColorPallete from "../config/ColorPallete";
import Icon from "./Icon";
import Text from "./Text";

function TimeStamp({
  style = {},
  time = "",
  read = false,
  showRead = true,
  undelivered = false,
}) {
  return (
    <LinearGradient
      colors={["rgba(0,0,0,.8)", "transparent"]}
      style={[styles.container, style]}
      start={[1, 1]}
      end={[0, 0]}
    >
      <Text text={time} size={10} family="Inter" color="white" />
      {undelivered ? (
        <Icon
          Name="Ionicons"
          IconName={"time-outline"}
          color={colors.text}
          size={17}
          marginLeft={5}
        />
      ) : showRead ? (
        <Icon
          Name="Ionicons"
          IconName={read ? "checkmark-done" : "checkmark"}
          color={read ? ColorPallete.primary : "grey"}
          size={17}
          marginLeft={5}
        />
      ) : null}
    </LinearGradient>
  );
}

export default TimeStamp;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
