// Packages Imports
import { ActivityIndicator, StyleProp, View, ViewStyle } from "react-native";
import { TouchableRipple } from "react-native-paper";

// Local Imports
import AppIcon from "./AppIcon";
import { AppIconButtonProps } from "../types/ComponentTypes";
import ColorPallete from "../constants/ColorPallete";

// function component for AppIconButton
function AppIconButton(props: AppIconButtonProps) {
  // Destructuring props
  const {
    containerStyle,
    iconProps,
    onPress,
    loading,
    size = 50,
    backgroundColor = ColorPallete.primary,
  } = props;

  const dimensions = {
    width: size,
    height: size,
    borderRadius: size,
  };

  // Construct styles
  const finalStyles: StyleProp<ViewStyle> = [
    dimensions,
    {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: backgroundColor,
    },
  ];

  // render
  return (
    <TouchableRipple
      onPress={onPress}
      borderless
      disabled={loading}
      style={[dimensions, containerStyle]}
    >
      <View style={finalStyles}>
        {loading ? (
          <ActivityIndicator size={"small"} color={ColorPallete.white} />
        ) : (
          <AppIcon color={ColorPallete.white} size={size / 2} {...iconProps} />
        )}
      </View>
    </TouchableRipple>
  );
}

// exports
export default AppIconButton;
