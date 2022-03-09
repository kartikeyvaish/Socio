// Packages Imports
import { StyleProp, ViewStyle } from "react-native";
import { TouchableRipple } from "react-native-paper";
import Animated, {
  FadeInDown,
  FadeOutDown,
  interpolate,
  Layout as LT,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

// Local Imports
import ColorPallete from "../constants/ColorPallete";

// interface for VideoRecordButton
export interface VideoRecordButtonProps {
  visible?: boolean;
  IsRecording?: boolean;
  onPress?: () => void;
  buttonSize?: number;
}

// function component for VideoRecordButton
function VideoRecordButton(props: VideoRecordButtonProps) {
  // Destructuring props
  const { visible, IsRecording, onPress, buttonSize = 80 } = props;

  // Scale
  const Scale = useDerivedValue(() => {
    return IsRecording ? withTiming(1) : withTiming(0);
  }, [IsRecording]);

  // Interpolate the scale
  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(Scale.value, [0, 1], [1, 0.5]);
    const borderRadius = interpolate(Scale.value, [0, 1], [buttonSize / 2, 12]);

    return {
      borderRadius,
      transform: [{ scale: scale }],
    };
  });

  // styles for the inner ripple container
  const rippleStyles: StyleProp<ViewStyle> = { flex: 1, borderRadius: buttonSize / 2 };

  // styles for the main container
  const containerStyles: StyleProp<ViewStyle> = [
    {
      width: buttonSize,
      height: buttonSize,
      backgroundColor: ColorPallete.danger,
      overflow: "hidden",
    },
    animatedStyles,
  ];

  // render
  return visible ? (
    <Animated.View entering={FadeInDown} exiting={FadeOutDown} layout={LT} style={containerStyles}>
      <TouchableRipple style={rippleStyles} onPress={onPress}>
        <></>
      </TouchableRipple>
    </Animated.View>
  ) : null;
}

// exports
export default VideoRecordButton;
