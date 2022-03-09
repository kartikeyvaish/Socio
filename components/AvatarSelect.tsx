// Pakcages impors
import { View, StyleSheet, Image } from "react-native";
import Animated, { Layout, ZoomIn, ZoomOut } from "react-native-reanimated";

// Local Imports
import AppIcon from "./AppIcon";
import AppImage from "./AppImage";
import ColorPallete from "../constants/ColorPallete";
import { ChoosePictureProps } from "../types/ComponentTypes";
import IconNames from "../constants/IconNames";

// function component for ChoosePicture
function ChoosePicture(props: ChoosePictureProps) {
  // Destructuring props
  const { uri, onPickPress, onRemovePress, showRemoveIcon = true } = props;

  // check if uri is network uri or local uri
  let isNetworkImage = uri.startsWith("http");

  // if uri is not present then return null
  if (!uri) return null;

  // render
  return (
    <View style={styles.PicAndIconContainer}>
      <View style={styles.ImageContainer}>
        {isNetworkImage ? (
          <AppImage
            uri={uri}
            style={styles.image}
            resizeMode="cover"
            backgroundColor="transparent"
          />
        ) : (
          <Image source={{ uri }} style={styles.image} resizeMode="cover" />
        )}

        {!showRemoveIcon ? (
          <Animated.View
            style={styles.crossIcon}
            entering={ZoomIn}
            exiting={ZoomOut}
            layout={Layout}
          >
            <AppIcon
              family={IconNames.Entypo}
              name={"circle-with-cross"}
              color={ColorPallete.primary}
              size={35}
              onPress={onRemovePress}
            />
          </Animated.View>
        ) : null}
      </View>

      <AppIcon
        family={IconNames.Entypo}
        name={"edit"}
        size={30}
        color={ColorPallete.primary}
        style={styles.EditIcon}
        onPress={onPickPress}
      />
    </View>
  );
}

// exports
export default ChoosePicture;

// styles
const styles = StyleSheet.create({
  PicAndIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  ImageContainer: {
    padding: 2,
    borderWidth: 1,
    borderColor: ColorPallete.primary,
    borderRadius: 50,
  },
  EditIcon: {
    position: "absolute",
    zIndex: 10,
    top: 10,
    right: 10,
  },
  crossIcon: {
    position: "absolute",
    zIndex: 10,
    top: -5,
    right: -5,
    backgroundColor: ColorPallete.white,
    borderRadius: 100,
  },
});
