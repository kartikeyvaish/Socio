// Packages Imports
import { useEffect, useState } from "react";
import { StyleSheet, Pressable, View, StatusBar } from "react-native";
import { Video } from "expo-av";
import * as NavigationBar from "expo-navigation-bar";

// components/ types imports
import AppContainer from "../../components/AppContainer";
import AppHeaderBar from "../../components/AppHeaderBar";
import ColorPallete from "../../constants/ColorPallete";
import Helper from "../../utils/Helper";
import useVideoPlayer from "../../hooks/useVideoPlayer";
import VideoSeekBar from "../../components/VideoSeekBar";
import AnimatedView from "../../components/AnimatedView";
import { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import RoundIconButton from "../../components/RoundIconButton";
import IconNames from "../../constants/IconNames";
import { useIsFocused, useTheme } from "@react-navigation/native";

// function component for VideoPlayerScreen
function VideoPlayerScreen({ navigation, route }) {
  const [showOptions, SetshowOptions] = useState(true);

  // custom hooks
  const {
    onProgressUpdate,
    progress,
    VideoPlayer,
    IsPlaying,
    TogglePlayback,
    CurrentTime,
    Duration,
    SeekVideo,
  } = useVideoPlayer({});

  const uri = route?.params?.uri;
  const headerTitle = route?.params?.headerTitle ?? "Video Preview";
  const isFocused = useIsFocused();
  const { colors, dark } = useTheme();

  useEffect(() => {
    if (isFocused) {
      NavigationBar.setBackgroundColorAsync(ColorPallete.black);
    } else {
      NavigationBar.setBackgroundColorAsync(colors.background);
    }
  }, [isFocused]);

  if (!uri) return null;

  // Bar Style
  const barStyle = "light-content";

  // StatusBar background color
  const barBackgroundColor = ColorPallete.black;

  // render
  return (
    <View style={styles.container}>
      {/* StatusBar */}
      <StatusBar barStyle={barStyle} backgroundColor={barBackgroundColor} animated={true} />

      <Pressable style={styles.videoPlayerBox} onPress={() => SetshowOptions(!showOptions)}>
        <Video
          source={{ uri }}
          ref={VideoPlayer}
          shouldPlay
          isLooping
          style={styles.video}
          useNativeControls={false}
          onPlaybackStatusUpdate={onProgressUpdate}
          resizeMode="contain"
        />

        {showOptions ? (
          <AnimatedView
            entering={FadeIn}
            exiting={FadeOut}
            layout={Layout}
            style={{ position: "absolute" }}
          >
            <RoundIconButton
              family={IconNames.FontAwesome5}
              name={IsPlaying ? "pause" : "play"}
              size={30}
              color={ColorPallete.white}
              marginLeft={3}
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              onPress={TogglePlayback}
            />
          </AnimatedView>
        ) : null}
      </Pressable>

      <AppHeaderBar
        title={headerTitle}
        isHeaderVisible={showOptions}
        style={styles.headerBar}
        titleColor={ColorPallete.white}
        onIconPress={() => navigation.goBack()}
      />

      <VideoSeekBar
        showSeekbar={showOptions}
        progress={progress}
        currentTime={Helper.get_seconds_format(CurrentTime / 1000)}
        elapsedTime={Helper.get_seconds_format(Duration / 1000)}
        onSlidingComplete={SeekVideo}
      />
    </View>
  );
}

// exports
export default VideoPlayerScreen;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorPallete.black,
  },
  headerBar: {
    borderWidth: 0,
    elevation: 0,
    position: "absolute",
    top: 0,
    zIndex: 100,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  videoPlayerBox: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
