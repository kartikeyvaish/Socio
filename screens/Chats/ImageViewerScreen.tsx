// Packages Imports
import { useState } from "react";
import { StyleSheet, Pressable } from "react-native";

// components/ types imports
import AppContainer from "../../components/AppContainer";
import AppHeaderBar from "../../components/AppHeaderBar";
import AppImage from "../../components/AppImage";
import ColorPallete from "../../constants/ColorPallete";

// function component for ImageViewerScreen
function ImageViewerScreen({ navigation, route }) {
  const [showOptions, SetshowOptions] = useState(true);

  const uri = route?.params?.uri;
  const headerTitle = route?.params?.headerTitle ?? "Image Preview";

  if (!uri) return null;

  // render
  return (
    <AppContainer style={styles.container}>
      <Pressable style={styles.imageViewerBox} onPress={() => SetshowOptions(!showOptions)}>
        <AppImage uri={uri} style={styles.video} resizeMode="contain" />
      </Pressable>

      <AppHeaderBar
        title={headerTitle}
        isHeaderVisible={showOptions}
        style={styles.headerBar}
        titleColor={ColorPallete.white}
        onIconPress={() => navigation.goBack()}
      />

      {/* <VideoSeekBar
        showSeekbar={showOptions}
        progress={progress}
        currentTime={Helper.get_seconds_format(CurrentTime / 1000)}
        elapsedTime={Helper.get_seconds_format(Duration / 1000)}
        onSlidingComplete={SeekVideo}
      /> */}
    </AppContainer>
  );
}

// exports
export default ImageViewerScreen;

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
  imageViewerBox: {
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
