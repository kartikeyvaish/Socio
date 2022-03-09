// Packages Imports
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";

// Local Imports
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import ColorPallete from "../constants/ColorPallete";
import Helper from "../utils/Helper";
import IconNames from "../constants/IconNames";
import RecordBreathingIcon from "./RecordBreathingIcon";
import RecordedPlayer from "./RecordedPlayer";
import useBackHandler from "../hooks/useBackHandler";
import useRecording from "../hooks/useRecorder";

// interface for RecorderContainer
export interface RecorderContainerProps {
  onDeletePress?: () => void;
  onSendPress?: (data: any) => void;
  containerVisible?: boolean;
}

// Default Animated Props
const defaultAnimatedProps = {
  entering: FadeIn,
  exiting: FadeOut,
  layout: Layout,
};

// function component for RecorderContainer
function RecorderContainer(props: RecorderContainerProps) {
  // Destructuring props
  const { onDeletePress, onSendPress, containerVisible } = props;

  const { IsRecording, StartRecording, StopRecording, RecordedURI, Progress, SetRecordedURI } =
    useRecording({});

  // Get the theme
  const { dark } = useTheme();

  // on backPress
  useBackHandler(() => {
    if (containerVisible) {
      SetRecordedURI(null);
      StopRecording();
      if (typeof onDeletePress === "function") {
        onDeletePress();
        return true;
      }
    }

    return false;
  });

  // final containerStyles
  const containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    {
      backgroundColor: dark ? ColorPallete.lightBlack : ColorPallete.white,
      borderTopColor: dark ? ColorPallete.lightBlack : ColorPallete.lightGrey,
    },
  ];

  // render
  return (
    <Animated.View style={containerStyles} {...defaultAnimatedProps}>
      {IsRecording ? (
        <Animated.View style={styles.playbackTimeContainer} {...defaultAnimatedProps}>
          <AppText text={Helper.get_seconds_format(Progress / 1000)} size={18} />
        </Animated.View>
      ) : null}

      {!IsRecording ? (
        <Animated.View style={styles.playbackTimeContainer} {...defaultAnimatedProps}>
          {RecordedURI ? (
            <RecordedPlayer uri={RecordedURI} />
          ) : (
            <View style={{ flex: 1 }}>
              <AppText
                text="Tap the Record Button to Start Recording.."
                size={18}
                numberOfLines={1}
              />
            </View>
          )}
        </Animated.View>
      ) : null}

      <Animated.View layout={Layout} style={styles.bottomIconsContainer}>
        {!IsRecording ? (
          <Animated.View entering={FadeIn} exiting={FadeOut} layout={Layout}>
            <AppIcon
              family={IconNames.Feather}
              name="trash"
              size={30}
              onPress={() => {
                StopRecording();
                SetRecordedURI(null);
                if (typeof onDeletePress === "function") {
                  onDeletePress();
                }
              }}
            />
          </Animated.View>
        ) : null}

        <View style={styles.recordButtonContainer}>
          <RecordBreathingIcon
            onPress={
              IsRecording
                ? async () => {
                    await StopRecording();
                  }
                : StartRecording
            }
            visible={IsRecording}
          />
        </View>

        {!IsRecording ? (
          <Animated.View {...defaultAnimatedProps}>
            <AppIcon
              family={IconNames.Feather}
              name="send"
              size={30}
              onPress={() => {
                if (typeof onSendPress === "function") onSendPress(RecordedURI);
              }}
            />
          </Animated.View>
        ) : null}
      </Animated.View>
    </Animated.View>
  );
}

// exports
export default RecorderContainer;

// styles
const styles = StyleSheet.create({
  container: {
    height: 150,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 10,
    borderTopWidth: 1,
  },
  bottomIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    padding: 20,
  },
  playbackTimeContainer: { flex: 1, padding: 15 },
  recordButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
