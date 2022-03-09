// Packages Imports
import { View, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

// component imports
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import ColorPallete from "../constants/ColorPallete";
import FontNames from "../constants/FontNames";
import Helper from "../utils/Helper";
import IconNames from "../constants/IconNames";
import useAudioPlayer from "./../hooks/useAudioPlayer";
import { useTheme } from "@react-navigation/native";

// interface for RecordedPlayer
export interface RecordedPlayerProps {
  uri?: string;
  maxWidth?: number;
}

// function component for RecordedPlayer
function RecordedPlayer(props: RecordedPlayerProps) {
  // Destructuring props
  const { uri, maxWidth = undefined } = props;
  const { colors } = useTheme();

  // custom hook for AudioPlayer
  const AudioProps = useAudioPlayer({ uri });

  // get audio player functions
  const { IsPLaying, PlayAudio, PlayerLoading, PauseAudio, ElapsedTime, Progress, SeekPlayer } =
    AudioProps;

  // if uri is not present then return null
  if (!uri) return null;

  // render
  return (
    <View style={[styles.container, { maxWidth: maxWidth }]}>
      <AppIcon
        family={IconNames.FontAwesome5}
        name={!IsPLaying ? "play" : "pause"}
        size={25}
        marginRight={15}
        loading={PlayerLoading}
        onPress={IsPLaying ? PauseAudio : PlayAudio}
      />

      <Slider
        style={{ flex: 1 }}
        minimumValue={0}
        maximumValue={100}
        value={Progress}
        step={1}
        minimumTrackTintColor={colors.text}
        maximumTrackTintColor={colors.text}
        thumbTintColor={ColorPallete.primary}
        onSlidingComplete={SeekPlayer}
      />

      <AppText
        text={Helper.get_seconds_format(ElapsedTime / 1000)}
        size={15}
        family={FontNames.PoppinsRegular}
      />
    </View>
  );
}

// exports
export default RecordedPlayer;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
  },
});
