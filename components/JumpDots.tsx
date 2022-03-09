// Packages Imports
import { useTheme } from "@react-navigation/native";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";

// interface for Dots
export interface DotsProps {
  dotProgress?: SharedValue<number>;
  dotColor?: string;
}

// function component for JumpDots
function JumpDots(props: DotsProps) {
  // Destructuring props
  const { dotProgress, dotColor } = props;
  const { colors } = useTheme();

  // styles for dot
  const dotStyle: StyleProp<ViewStyle> = [
    styles.dot,
    {
      backgroundColor: dotColor ? dotColor : colors.text,
    },
  ];

  const dotAnimatedStyles = useAnimatedStyle(() => {
    const translateY = interpolate(dotProgress.value, [0, 1], [0, -10]);

    return {
      transform: [
        {
          translateY: translateY,
        },
      ],
    };
  });

  // render
  return <Animated.View style={[dotStyle, dotAnimatedStyles]}></Animated.View>;
}

// exports
export default JumpDots;

// styles
const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
});
