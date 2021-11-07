import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Video } from "expo-av";
import ColorPallete from "../config/ColorPallete";

function PreviewFile({ mediaType = "photo", uri, showBorder = false }) {
  return uri ? (
    <View
      style={{
        borderColor: ColorPallete.primary,
        borderWidth: showBorder ? 1 : 0,
      }}
    >
      {mediaType === "photo" ? (
        <Image
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          source={{ uri: uri }}
        />
      ) : (
        <Video
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          source={{ uri: uri }}
          resizeMode="contain"
          isLooping
          shouldPlay
          useNativeControls
        />
      )}
    </View>
  ) : null;
}

export default PreviewFile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
