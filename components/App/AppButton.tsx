// Packages Imports (from node_modules)
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { memo } from "react";
import { RectButton } from "react-native-gesture-handler";

// Local Imports (components/types/utils)
import AnimatedView from "../Animated/AnimatedView";
import AppText from "./AppText";
import ColorPallete from "../../constants/ColorPallete";

// Named Imports
import { AnimatedViewProps, AppTextProps } from "../../types/ComponentTypes";
import { getMarginStyles } from "../../helpers/utils";
import { MarginProps } from "../../types/GlobalTypes";

// interface for AppButton component
export interface AppButtonProps {
  margins?: MarginProps;
  title?: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  titleProps?: AppTextProps;
  disabled?: boolean;
  animatedViewProps?: AnimatedViewProps;
}

// functional component for AppButton
function AppButton(props: AppButtonProps) {
  // Destructuring props
  const {
    title,
    onPress,
    containerStyle,
    backgroundColor = ColorPallete.primary,
    margins,
    titleProps,
    disabled = false,
    animatedViewProps,
  } = props;

  const containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    {
      backgroundColor: backgroundColor,
      opacity: disabled ? 0.8 : 1,
    },
    getMarginStyles(margins),
    containerStyle,
  ];

  // render
  return (
    <AnimatedView {...animatedViewProps}>
      <RectButton onPress={onPress} style={containerStyles}>
        <AppText
          text={title}
          color={ColorPallete.white}
          size={14}
          fontWeight='600'
          {...titleProps}
        />
      </RectButton>
    </AnimatedView>
  );
}

// exports
export default memo(AppButton);

// styles for AppButton
const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPallete.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
