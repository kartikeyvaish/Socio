// Packages Imports (from node_modules)
import { memo } from "react";
import { StyleSheet, StyleProp, TextInput, TextStyle, View, ViewStyle } from "react-native";

// Local Imports (components/types/utils)
import AnimatedView from "../Animated/AnimatedView";
import ColorPallete from "../../constants/ColorPallete";

// Named Imports
import { getMarginStyles } from "../../helpers/utils";
import { TextFieldInputProps } from "../../types/ComponentTypes";
import { useAppSelector } from "../../store/reduxHooks";

// functional component for TextFieldInput
function TextFieldInput(props: TextFieldInputProps) {
  // Destructuring props
  const { margins, iconComponent, ...restProps } = props;

  const { colors, dark } = useAppSelector(state => state.theme);

  const containerStyle: StyleProp<ViewStyle> = [styles.container, getMarginStyles(margins)];

  const textInputStyles: StyleProp<TextStyle> = [
    styles.textInput,
    {
      backgroundColor: dark
        ? ColorPallete.inputBackgroundColorDark
        : ColorPallete.inputBackgroundColorLight,
      color: dark ? colors.text : ColorPallete.inputTextColorLight,
      paddingRight: iconComponent ? 32 : 16,
    },
  ];

  const placeholderTextColor = dark
    ? ColorPallete.placeholderTextColorDark
    : ColorPallete.placeholderTextColorLight;

  // render
  return (
    <AnimatedView style={containerStyle}>
      <AnimatedView style={{ justifyContent: "center" }}>
        <TextInput
          placeholderTextColor={placeholderTextColor}
          style={textInputStyles}
          {...restProps}
        />

        {iconComponent ? <View style={styles.iconContainer}>{iconComponent}</View> : null}
      </AnimatedView>
    </AnimatedView>
  );
}

// exports
export default memo(TextFieldInput);

// styles for TextFieldInput
const styles = StyleSheet.create({
  container: {},
  textInput: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.10)",
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "400",
  },
  iconContainer: {
    position: "absolute",
    right: 16,
  },
});
