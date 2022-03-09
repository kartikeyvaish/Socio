// Packages Imports
import { useEffect } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { TouchableRipple } from "react-native-paper";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

// Local Imports
import ColorPallete from "../constants/ColorPallete";

// interface for RecordBreathingIcon
export interface RecordBreathingIconProps {
  color?: string;
  size?: number;
  outerContainerStyle?: StyleProp<ViewStyle>;
  innerContainerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  visible?: boolean;
}

// function component for RecordBreathingIcon
function RecordBreathingIcon(props: RecordBreathingIconProps) {
  // Destructuring props
  const { color, size = 12, innerContainerStyle, outerContainerStyle, onPress, visible } = props;

  // useEffect to listener to visible
  useEffect(() => {
    if (visible) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [visible]);

  const opacity = useSharedValue(1);

  const startAnimation = () => {
    opacity.value = withRepeat(
      withSequence(withTiming(0, { duration: 500 }), withTiming(1, { duration: 500 })),
      -1
    );
  };

  const stopAnimation = () => {
    cancelAnimation(opacity);
    opacity.value = 1;
  };

  // outerContainerStyles
  const outerContainerStyles: StyleProp<ViewStyle> = [
    styles.recordButtonContainer,
    {
      borderColor: color ? color : ColorPallete.danger,
    },
    outerContainerStyle,
  ];

  // innerContainerStyles
  const innerContainerStyles: StyleProp<ViewStyle> = [
    styles.innerRecordButton,
    {
      backgroundColor: color ? color : ColorPallete.danger,
      width: size,
      height: size,
    },
    innerContainerStyle,
  ];

  // ripple container styles
  const rippleStyles: StyleProp<ViewStyle> = { borderRadius: size * 100, padding: 5 };

  // animated Styles
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  // render
  return (
    <TouchableRipple onPress={onPress} style={rippleStyles} borderless>
      <Animated.View style={[outerContainerStyles, animatedStyles]}>
        <View style={innerContainerStyles}></View>
      </Animated.View>
    </TouchableRipple>
  );
}

// exports
export default RecordBreathingIcon;

// styles
const styles = StyleSheet.create({
  recordButtonContainer: {
    width: 35,
    height: 35,
    borderWidth: 2,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  innerRecordButton: { borderRadius: 2 },
});
