// packages Imports
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// Custom hook to handle pan gesture on messages card
export default function useMessagePanHandler() {
  const MAX_TRANSLATE = 100;
  const position = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: event => {
      const dragX = Math.abs(event.translationX);
      const translateX = Math.min(MAX_TRANSLATE, dragX);

      if (event.translationX > 0) {
        position.value = 0;
      } else {
        position.value = -translateX;
      }
    },
    onEnd: _ => {
      position.value = withTiming(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return { gestureHandler, animatedStyle };
}
