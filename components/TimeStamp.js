import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Text from "./Text";

function TimeStamp({ style = {}, time = "" }) {
  return (
    <LinearGradient
      colors={["rgba(0,0,0,.8)", "transparent"]}
      style={[styles.container, style]}
      start={[1, 1]}
      end={[0, 0]}
    >
      <Text text={time} size={10} family="Inter" color="white" />
    </LinearGradient>
  );
}

export default TimeStamp;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageTimeStamp: {},
});
