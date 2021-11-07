import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import ColorPallete from "../config/ColorPallete";
import Icon from "./Icon";

const ScreenWidth = Dimensions.get("screen").width;
const EachBoxWidth = ScreenWidth / 3;

function ProfilePostCard({
  mime_type = "image/jpg",
  preview_file,
  onPress,
  onLongPress,
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Image source={{ uri: preview_file }} style={styles.Image} />
      {mime_type.slice(0, 5) === "video" ? (
        <View style={styles.VideoBox}>
          <Icon
            Name="FontAwesome"
            IconName="video-camera"
            size={18}
            color={ColorPallete.primary}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

export default ProfilePostCard;

const styles = StyleSheet.create({
  container: {
    width: EachBoxWidth,
    height: EachBoxWidth,
    borderColor: "white",
    borderWidth: 1,
  },
  Image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  VideoBox: {
    position: "absolute",
    right: 5,
    top: 5,
  },
});
