// Packages Imports (from node_modules)
import { memo } from "react";
import { StyleProp, StyleSheet, ViewStyle, ActivityIndicator } from "react-native";
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
  loading?: boolean;
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
    loading = false,
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

  const onPressHandler = () => {
    if (loading || disabled) return;

    if (onPress) onPress();
  };

  // render
  return (
    <AnimatedView {...animatedViewProps}>
      <RectButton onPress={onPressHandler} style={containerStyles}>
        <AppText
          text={title}
          color={ColorPallete.white}
          size={14}
          fontWeight='600'
          {...titleProps}
        />

        {loading ? (
          <ActivityIndicator
            color={ColorPallete.white}
            size='small'
            style={styles.activityIndicator}
          />
        ) : null}
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
  activityIndicator: {
    position: "absolute",
    left: 20,
  },
});
