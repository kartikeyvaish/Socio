// Packages Imports
import { useTheme } from "@react-navigation/native";
import { StyleSheet, ScrollView, StyleProp, ViewStyle, Pressable } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  Layout as LT,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";

// Component Imports
import { BottomSheetProps } from "../types/ComponentTypes";
import ColorPallete from "../constants/ColorPallete";
import useBackHandler from "../hooks/useBackHandler";

// function component for BottomSheet
function BottomSheet(props: BottomSheetProps) {
  // Destructuring props
  const { visible, onBackdropPress, children } = props;

  // Theme
  const { dark } = useTheme();

  // When bottom sheet is opened, add event listener to handle back button press
  useBackHandler(() => {
    if (visible) {
      if (typeof onBackdropPress === "function") onBackdropPress();

      // Return true to prevent default back button behavior
      return true;
    }

    // Return false to allow default back button behavior
    return false;
  });

  // final sheet container
  const sheetStyles: StyleProp<ViewStyle> = [
    styles.sheetContainer,
    {
      backgroundColor: dark ? ColorPallete.black : ColorPallete.white,
    },
  ];

  // render
  return visible ? (
    <Animated.View style={styles.backdropContainer} entering={FadeIn} exiting={FadeOut} layout={LT}>
      <Pressable style={{ flex: 1 }} onPress={onBackdropPress}></Pressable>

      <Animated.View style={sheetStyles} entering={SlideInDown} exiting={SlideOutDown} layout={LT}>
        <ScrollView>{children}</ScrollView>
      </Animated.View>
    </Animated.View>
  ) : null;
}

// exports
export default BottomSheet;

// styles
const styles = StyleSheet.create({
  backdropContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 200,
  },
  sheetContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    maxHeight: 300,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 40,
  },
});
