// Packages Imports
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

// Local imports
import AppText from "./AppText";
import ColorPallete from "../constants/ColorPallete";
import FontNames from "../constants/FontNames";
import { TextButtonProps } from "../types/ComponentTypes";

// function component for TextButton
function TextButton(props: TextButtonProps) {
  // Destructuring props
  const { text, onPress, color, backgroundColor, containerStyles } = props;

  const { dark } = useTheme();

  // contanier Styles
  const finalContainerStyles: StyleProp<ViewStyle> = [
    styles.container,
    {
      backgroundColor: backgroundColor ? backgroundColor : undefined,
      borderColor: dark ? ColorPallete.placeholderDark : ColorPallete.placeholderLight,
      borderWidth: backgroundColor ? 0 : 1,
    },
    containerStyles,
  ];

  // render
  return (
    <TouchableRipple style={finalContainerStyles} onPress={onPress}>
      <AppText color={color ? color : undefined} text={text} family={FontNames.InterRegular} />
    </TouchableRipple>
  );
}

// exports
export default TextButton;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    overflow: "hidden",
  },
});
