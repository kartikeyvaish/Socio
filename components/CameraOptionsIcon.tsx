// Packages Imports
import { ViewStyle, StyleProp, Pressable, ActivityIndicator } from "react-native";
import Animated from "react-native-reanimated";

// Local Imports
import AppIcon from "./AppIcon";
import { AppIconProps } from "../types/ComponentTypes";
import ColorPallete from "../constants/ColorPallete";

// interface for CameraOptionsIcon
export interface CameraOptionsIconProps extends Animated.AnimateProps<ViewStyle> {
  onPress?: () => void;
  iconProps?: AppIconProps;
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  loading?: boolean;
}

// function component for Camera Options Icon
function CameraOptionsIcon(props: CameraOptionsIconProps) {
  // Destructuring props
  const { onPress, iconProps, backgroundColor, visible = true, loading, ...otherProps } = props;

  const buttonStyles = {
    backgroundColor: backgroundColor ? backgroundColor : undefined,
    borderRadius: 100,
  };

  // render
  return visible ? (
    <Animated.View {...otherProps}>
      {loading ? (
        <ActivityIndicator size={"large"} color={ColorPallete.primary} />
      ) : (
        <Pressable style={buttonStyles} onPress={onPress}>
          <AppIcon {...iconProps} />
        </Pressable>
      )}
    </Animated.View>
  ) : null;
}

// exports
export default CameraOptionsIcon;
