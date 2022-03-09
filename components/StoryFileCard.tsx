// Packages Imports
import { useEffect, useRef } from "react";
import { View } from "react-native";
import { Video } from "expo-av";

// Local Imports
import AppImage from "./AppImage";
import Layout from "../constants/Layout";
import { PlaybackStatus } from "../types/ComponentTypes";
import { StoryFileCardProps } from "../store/stories/types";

// function component for StoryFileCard
function StoryFileCard(props: StoryFileCardProps) {
  // Destructuring props
  const { uri, mimeType, onVideoFinish, shouldVideoPlay } = props;

  // refs
  const VideoPlayer = useRef<Video>(null);

  // Play/Pause a video post according to viisibility
  useEffect(() => {
    if (shouldVideoPlay) VideoPlayer?.current?.playAsync();
    else VideoPlayer?.current?.pauseAsync();
  }, [shouldVideoPlay, uri]);

  // render
  return (
    <View style={{ width: Layout.window.width, height: Layout.window.height }}>
      {mimeType.slice(0, 5) === "image" ? (
        <AppImage uri={uri} />
      ) : mimeType.slice(0, 5) === "video" ? (
        <Video
          ref={VideoPlayer}
          source={{ uri: uri }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
          shouldPlay
          isLooping={false}
          onPlaybackStatusUpdate={(event: PlaybackStatus) =>
            event?.didJustFinish ? onVideoFinish?.() : null
          }
        />
      ) : null}
    </View>
  );
}

// exports
export default StoryFileCard;
