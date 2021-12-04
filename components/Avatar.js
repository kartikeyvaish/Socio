import React from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

import ColorPallete from "../config/ColorPallete";

function Avatar({
  uri,
  size = 80,
  borderColor,
  showBorder = false,
  borderWidth = 1,
  headers,
  style = {},
  borderRadius = null,
  showOnlineButton = false,
  online = false,
}) {
  const { colors } = useTheme();

  return uri ? (
    <View>
      <FastImage
        style={{
          width: size,
          height: size,
          borderRadius: borderRadius !== null ? borderRadius : size,
          backgroundColor: colors.background,
          borderColor: borderColor ? borderColor : ColorPallete.primary,
          borderWidth: showBorder ? borderWidth : 0,
          ...style,
        }}
        source={{
          uri: uri,
          headers: { headers },
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.web,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      {showOnlineButton ? (
        <View
          style={{
            backgroundColor: online ? "green" : "red",
            width: 8,
            height: 8,
            borderRadius: 20,
            position: "absolute",
            bottom: 1,
            right: 1,
          }}
        ></View>
      ) : null}
    </View>
  ) : null;
}

export default Avatar;
