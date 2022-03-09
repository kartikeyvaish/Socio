// Packages Imports
import { StyleSheet, StyleProp, View } from "react-native";
import FastImage, { ImageStyle } from "react-native-fast-image";
import { useTheme } from "@react-navigation/native";

// Components/Types imports
import { AppImageProps } from "../types/ComponentTypes";

// function component
function AppImage(props: AppImageProps) {
  // Theme
  const { colors } = useTheme();

  // Destructuring props
  const {
    size,
    uri,
    style = {},
    resizeMode = "cover",
    borderRadius = 0,
    borderColor = "grey",
    borderWidth = 1 - StyleSheet.hairlineWidth,
    showBorder = false,
    backgroundColor = colors.background,
  } = props;

  // Container Styles
  const containerStyles = [
    styles.ImageBoxPart,
    {
      borderColor: borderColor,
      borderWidth: showBorder ? borderWidth : 0,
    },
    style,
    {
      ...(size ? { width: size, height: size } : {}),
    },
  ];

  // ImageStyles
  const imageStyle: StyleProp<ImageStyle> = [
    {
      width: "100%",
      height: "100%",
      backgroundColor,
      borderRadius: borderRadius,
    },
  ];

  // Resize mode for the image
  const imageResizeMode =
    resizeMode === "cover" ? FastImage.resizeMode.cover : FastImage.resizeMode.contain;

  if (!uri) return null;

  // Render
  return (
    <View style={containerStyles}>
      <FastImage style={imageStyle} source={{ uri: uri }} resizeMode={imageResizeMode} />
    </View>
  );
}

// Exports
export default AppImage;

// Styles
const styles = StyleSheet.create({
  ImageBoxPart: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: "100%",
    height: "100%",
  },
  loadingComponent: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
