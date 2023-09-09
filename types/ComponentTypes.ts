// Packages imports 
import { TextProps, ViewProps } from "react-native";
import Animated from "react-native-reanimated";

// Local Imports
import { FontNamesType } from "../constants/FontNames";
import { MarginProps } from "./GlobalTypes";

// interface for AnimatedView
export interface AnimatedViewProps extends Animated.AnimateProps<ViewProps> {
    visible?: boolean;
}

export interface CustomAppTextProps {
    text?: string;
    size?: number;
    color?: string;
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    fontFamily?: FontNamesType;
    margins?: MarginProps
}

export interface AppTextProps extends TextProps, CustomAppTextProps {
}