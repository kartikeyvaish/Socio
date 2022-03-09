// Packages Imports
import { useEffect, useRef } from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { Video } from "expo-av";

// Component Imports
import AppIconButton from "./IconButton";
import ColorPallete from "../constants/ColorPallete";
import IconNames from "../constants/IconNames";
import Layout from "../constants/Layout";
import { PostVideoCardProps } from "../types/ComponentTypes";
import useFileCache from "../hooks/useFileCache";

// function component for PostVideoCard
function PostVideoCard(props: PostVideoCardProps) {
  // Destructuring props
  const { width, height, uri, current_viewable_item, _id, onVideoPress, isMuted, local_uri } =
    props;

  // Custom hook to cache the file
  useFileCache({ asset_id: _id, uri, local_uri });

  // Calculate the width and height of file part
  const cardWidth = Layout.window.width;
  const ratio = cardWidth / width;
  const cardHeight = Math.min(height * ratio, cardWidth + 100);

  // refs
  const VideoPlayer = useRef<Video>(null);

  // Play/Pause a video post according to viisibility
  useEffect(() => {
    if (current_viewable_item === _id) VideoPlayer?.current?.playAsync();
    else VideoPlayer?.current?.pauseAsync();
  }, [current_viewable_item, isMuted, local_uri, uri]);

  // render
  return (
    <TouchableWithoutFeedback onPress={onVideoPress}>
      <View>
        <Video
          source={{ uri: local_uri ? local_uri : uri }}
          ref={VideoPlayer}
          resizeMode="contain"
          isLooping
          shouldPlay
          isMuted={isMuted}
          style={{ width: cardWidth, height: cardHeight }}
          rate={1.0}
        />

        <AppIconButton
          containerStyle={styles.muteContainer}
          backgroundColor={"rgba(0,0,0,0.7)"}
          iconProps={{
            family: IconNames.Feather,
            name: isMuted ? "volume-x" : "volume-2",
            color: ColorPallete.white,
          }}
          size={30}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

// exports
export default PostVideoCard;

const styles = StyleSheet.create({
  muteContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
