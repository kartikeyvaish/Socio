// Packages Imports
import { StyleSheet, Pressable } from "react-native";
import Animated, { FadeIn, FadeOut, Layout as LT } from "react-native-reanimated";

// Local Imports
import { BackDropProps } from "../types/ComponentTypes";
import Layout from "../constants/Layout";
import useBackHandler from "../hooks/useBackHandler";

// function component for BackDrop
function BackDrop(props: BackDropProps) {
  // Destructuring props
  const { visible, style, onBackDropPress, children } = props;

  // handle backpress
  useBackHandler(() => {
    if (visible) {
      onBackDropPress();
      return true;
    }

    return false;
  });

  // render
  return visible ? (
    <Animated.View
      style={[styles.container, style]}
      entering={FadeIn}
      exiting={FadeOut}
      layout={LT}
    >
      <Pressable style={styles.innerContainer} onPress={onBackDropPress}>
        {children}
      </Pressable>
    </Animated.View>
  ) : null;
}

// exports
export default BackDrop;

// styles
const styles = StyleSheet.create({
  container: {
    width: Layout.window.width,
    height: Layout.window.height,
    backgroundColor: "rgba(0,0,0,0.2)",
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: Layout.window.width,
    height: Layout.window.height,
    justifyContent: "center",
    alignItems: "center",
  },
});
