import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";

import ColorPallete from "../config/ColorPallete";
import Text from "./Text";

function CustomButton({
  title,
  onPress,
  style,
  loading,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  labelStyle,
  labelColor = "white",
  disabled,
  icon,
  uppercase,
  backgroundColor = ColorPallete.blue,
}) {
  return (
    <TouchableRipple
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
          ...style,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={disabled ? null : loading ? null : onPress}
      rippleColor={"rgb(0,0,0,0.2)"}
    >
      <View style={{ flexDirection: "row" }}>
        {loading ? (
          <ActivityIndicator size="small" color={labelColor} />
        ) : icon ? (
          icon
        ) : null}
        <Text
          text={uppercase ? title.toUpperCase() : title}
          color={labelColor}
          style={{ ...labelStyle }}
          weight="bold"
          marginLeft={loading ? 10 : icon ? 10 : 0}
          size={20}
        />
      </View>
    </TouchableRipple>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
