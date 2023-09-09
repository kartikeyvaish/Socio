// Packages imports 
import { ViewProps } from "react-native";
import Animated from "react-native-reanimated";

// interface for AnimatedView
export interface AnimatedViewProps extends Animated.AnimateProps<ViewProps> {
    visible?: boolean;
} 