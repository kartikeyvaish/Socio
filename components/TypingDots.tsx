// Packages Imports
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

// Local Imports
import JumpDots from "./JumpDots";

// function component for TypingDots
function TypingDots() {
  // Shared Values
  const dotOne = useSharedValue(0);
  const dotTwo = useSharedValue(0);
  const dotThree = useSharedValue(0);

  useEffect(() => {
    dotOne.value = withRepeat(withSequence(withTiming(1, { duration: 500 }), withSpring(0)), -1);
    dotTwo.value = withDelay(
      250,
      withRepeat(withSequence(withTiming(1, { duration: 500 }), withSpring(0)), -1)
    );
    dotThree.value = withDelay(
      400,
      withRepeat(withSequence(withTiming(1, { duration: 500 }), withSpring(0)), -1)
    );
  }, []);

  // render
  return (
    <View style={styles.container}>
      <JumpDots dotProgress={dotOne} />
      <JumpDots dotProgress={dotTwo} />
      <JumpDots dotProgress={dotThree} />
    </View>
  );
}

// exports
export default TypingDots;

// styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    flexDirection: "row",
  },
});
