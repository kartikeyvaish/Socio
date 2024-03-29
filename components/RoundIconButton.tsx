// packages Imports
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { TouchableRipple } from "react-native-paper";

// Components Imports and Types
import AppIcon from "./AppIcon";
import { AppIconProps } from "../types/ComponentTypes";
import ColorPallete from "../constants/ColorPallete";

// RoundIconButtonProps interface
export interface RoundIconButtonProps extends AppIconProps {
  style?: StyleProp<ViewStyle>;
}

// function component for RoundIconButton
function RoundIconButton(props: RoundIconButtonProps) {
  // Destructuring props
  const { style, onPress, ...otherProps } = props;

  // render
  return (
    <TouchableRipple
      onPress={otherProps.loading ? null : onPress}
      style={[styles.roundButtonContainer, style]}
      borderless
    >
      <AppIcon {...otherProps} />
    </TouchableRipple>
  );
}

export default RoundIconButton;

const styles = StyleSheet.create({
  roundButtonContainer: {
    borderRadius: 100,
    overflow: "hidden",
    width: 60,
    height: 60,
    backgroundColor: ColorPallete.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
