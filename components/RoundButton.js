import React from "react";
import { ActivityIndicator } from "react-native";
import { View, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";

import ColorPallete from "../config/ColorPallete";
import Icon from "./Icon";

function RoundButton({
  backgroundColor = ColorPallete.primary,
  IconProps = {},
  Name,
  IconName,
  size,
  color,
  disabled,
  onPress,
  loading = false,
  style = {},
}) {
  return (
    <TouchableRipple
      style={{
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: backgroundColor,
        opacity: loading ? 0.5 : 1,
        ...style,
      }}
      onPress={loading ? null : onPress}
      borderless
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 60,
          backgroundColor: backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" color={color} />
        ) : (
          <Icon
            Name={Name}
            IconName={IconName}
            size={size}
            color={color}
            disabled={loading ? true : disabled}
            onPress={loading ? null : onPress}
            {...IconProps}
          />
        )}
      </View>
    </TouchableRipple>
  );
}

export default RoundButton;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderRadius: 50,
  },
});
