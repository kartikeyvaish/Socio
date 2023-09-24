// Packages Imports
import { useEffect, useState } from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { ResizeMode, Video } from "expo-av";
import { ZoomIn, ZoomOut } from "react-native-reanimated";

// Component Imports
import AnimatedView from "../Animated/AnimatedView";
import AppIcon from "../App/AppIcon";
import ColorPallete from "../../constants/ColorPallete";
import Layout from "../../constants/Layout";
import useFirstRender from "../../hooks/useFirstRender";

// Named Imports
import { PostProps } from "../../types/AppTypes";

export interface PostVideoCardProps {
  width: PostProps["files"][0]["width"];
  height: PostProps["files"][0]["height"];
  url: PostProps["files"][0]["url"];
  shouldPlay?: boolean;
  isMuted?: boolean;
  onVideoPress?: () => void;
}

// function component for PostVideoCard
function PostVideoCard(props: PostVideoCardProps) {
  // Destructuring props
  const {
    width,
    height,
    url,
    shouldPlay = false,
    onVideoPress,
    isMuted,
  } = props;

  // refs
  const firstRender = useFirstRender();

  // Local states
  const [muteIconVisible, setMuteIconVisible] = useState<boolean>(false);

  // show mute icon for 2 seconds then disable it
  // if mute status changes then again show it for 3 seconds
  // disable it again
  useEffect(() => {
    setMuteIconVisible(true);

    const timeout = setTimeout(() => {
      setMuteIconVisible(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isMuted]);

  // Calculate the width and height of file part
  const cardWidth = Layout.window.width;
  const ratio = cardWidth / width;
  const cardHeight = Math.min(height * ratio, cardWidth + 100);

  // render
  return (
    <TouchableWithoutFeedback onPress={onVideoPress}>
      <View>
        <Video
          source={{ uri: url }}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay={shouldPlay}
          isMuted={isMuted}
          style={{ width: cardWidth, height: cardHeight }}
          rate={1.0}
        />

        {muteIconVisible ? (
          <RectButton style={styles.muteContainer}>
            <AnimatedView
              entering={!firstRender ? ZoomIn : null}
              exiting={ZoomOut}
              key={isMuted ? "volume-x" : "volume-2"}
            >
              <AppIcon
                family="Feather"
                name={isMuted ? "volume-x" : "volume-2"}
                color={ColorPallete.white}
                size={18}
              />
            </AnimatedView>
          </RectButton>
        ) : null}
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
    backgroundColor: "rgba(0,0,0,0.7)",
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
