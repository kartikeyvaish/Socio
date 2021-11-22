import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import FastImage from "react-native-fast-image";

import { useTheme } from "@react-navigation/native";

function Image({
  uri,
  style = {},
  resizeMode = "contain",
  onPress = null,
  borderRadius = 0,
}) {
  const { colors } = useTheme();

  const MainImage = () => {
    return (
      <Pressable style={[styles.ImageBoxPart, { ...style }]} onPress={onPress}>
        <FastImage
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: colors.background,
            borderRadius: borderRadius,
          }}
          source={{ uri: uri }}
          resizeMode={
            resizeMode === "cover"
              ? FastImage.resizeMode.cover
              : FastImage.resizeMode.contain
          }
        />
      </Pressable>
    );
  };

  return <View style={styles.container}>{MainImage()}</View>;
}

export default Image;

const styles = StyleSheet.create({
  container: {},
  ImageBoxPart: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});
