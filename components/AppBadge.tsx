// packges Imports
import { StyleProp, ViewStyle } from "react-native";
import { Badge } from "react-native-paper";
import { Layout, ZoomIn, ZoomOut } from "react-native-reanimated";

// components imports
import FontNames from "../constants/FontNames";
import Helper from "../utils/Helper";
import AnimatedView from "./AnimatedView";

// interface AppBadgeProps
export interface AppBadgeProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  badgeCount?: number;
  badgeContainerStyle?: StyleProp<ViewStyle>;
}

// function component for AppBadge
function AppBadge(props: AppBadgeProps) {
  // Destructuring props
  const { style, onPress, badgeCount, badgeContainerStyle } = props;

  // render
  return !badgeCount ? null : (
    <AnimatedView style={badgeContainerStyle} entering={ZoomIn} exiting={ZoomOut} layout={Layout}>
      <Badge size={25} style={[{ fontFamily: FontNames.InterBold }, style]} onPress={onPress}>
        {Helper.abbreviate_number(badgeCount)}
      </Badge>
    </AnimatedView>
  );
}

// exports
export default AppBadge;
