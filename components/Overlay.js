import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import ColorPallete from "../config/ColorPallete";
import Text from "./Text";

const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;
const containerWidth = ScreenWidth * 0.8;

function Overlay({
  text = "Loading...",
  children,
  visible = false,
  duration = 500,
}) {
  const containerOpacity = useSharedValue(0);
  const containerHeight = useSharedValue(0);

  // useEffect to detect changes visiblilty props and accordingly set opacity
  useEffect(() => {
    if (visible) containerHeight.value = ScreenHeight;
    else containerOpacity.value = 0;
  }, [visible]);

  // Container Animated Style
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(
        containerOpacity.value,
        {
          duration: duration,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        },
        () => {
          if (visible === false) containerHeight.value = 0;
        }
      ),
      height: withTiming(
        containerHeight.value,
        {
          duration: 1,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        },
        () => {
          if (visible === true) {
            containerOpacity.value = 1;
          }
        }
      ),
    };
  });

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      {children ? (
        children // if children is passed, render it
      ) : (
        <View style={styles.childContainer}>
          <Text text={text} color={ColorPallete.black} size={20} />
        </View>
      )}
    </Animated.View>
  );
}

export default Overlay;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: ScreenWidth,
    zIndex: 1000,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  childContainer: {
    width: containerWidth,
    height: 80,
    backgroundColor: ColorPallete.white,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
