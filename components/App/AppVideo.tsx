// Packages Imports (from node_modules)
import { useEffect, useRef } from "react";
import { AVPlaybackSourceObject, Video, VideoProps } from "expo-av";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Blurhash } from "react-native-blurhash";
import { FadeOut } from "react-native-reanimated";

// Local Imports (components/types/utils)
import AnimatedView from "../Animated/AnimatedView";
import useVideoCache from "../../hooks/useVideoCache";

// interface for AppVideo component
export interface AppVideoProps extends VideoProps {
  videoSource?: AVPlaybackSourceObject;
  uniqueCacheKey?: string;
  blurhash?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

// functional component for AppVideo
function AppVideo(props: AppVideoProps) {
  // Destructuring props
  const {
    videoSource,
    uniqueCacheKey,
    shouldPlay,
    blurhash,
    onPlaybackStatusUpdate,
    containerStyle,
    ...restProps
  } = props;

  const { hookPlaybackUpdate, isReady, source, cacheReady } = useVideoCache({
    uniqueCacheKey,
    videoSource,
  });

  useEffect(() => {
    if (isReady) {
      videoRef.current.setOnPlaybackStatusUpdate(playbackStatus => {
        if (
          onPlaybackStatusUpdate !== undefined &&
          typeof onPlaybackStatusUpdate === "function"
        )
          onPlaybackStatusUpdate(playbackStatus);

        hookPlaybackUpdate(playbackStatus);
      });
    }
  }, [isReady, cacheReady, shouldPlay]);

  const videoRef = useRef<Video>(null);

  // render
  return (
    <AnimatedView style={containerStyle}>
      <Video
        ref={videoRef}
        {...restProps}
        progressUpdateIntervalMillis={100}
        source={source}
        shouldPlay={isReady && shouldPlay}
      />

      {!isReady ? (
        <AnimatedView style={StyleSheet.absoluteFillObject} exiting={FadeOut}>
          <Blurhash blurhash={blurhash} style={{ flex: 1 }} />
        </AnimatedView>
      ) : null}
    </AnimatedView>
  );
}

// exports
export default AppVideo;
