import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import ColorPallete from "../config/ColorPallete";
import Helper from "../config/Helper";
import Icon from "./Icon";
import Text from "./Text";

const ScreenWidth = Dimensions.get("screen").width;
const EachBoxWidth = ScreenWidth / 4;

function FileCard({ mediaType = "photo", duration = 0, uri, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {mediaType === "photo" ? (
        <Image source={{ uri: uri }} style={styles.Image} />
      ) : (
        <View style={styles.VideoBox}>
          <Icon
            Name="FontAwesome"
            IconName="video-camera"
            size={15}
            color="white"
          />
          <Text
            text={Helper.SecondsFormat(duration)}
            containerStyle={styles.VideoIcon}
            color="white"
            size={14}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

export default FileCard;

const styles = StyleSheet.create({
  container: {
    width: EachBoxWidth,
    height: 80,
    borderColor: "white",
    borderWidth: 1,
  },
  VideoIcon: {
    position: "absolute",
    right: 5,
    top: 2,
  },
  Image: { width: "100%", height: "100%", resizeMode: "cover" },
  VideoBox: {
    backgroundColor: ColorPallete.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
