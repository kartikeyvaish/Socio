// Packages imports 
import { ColorValue, GestureResponderEvent, StyleProp, TextInputProps, TextProps, TextStyle, ViewProps } from "react-native";
import Animated from "react-native-reanimated";

// Local Imports
import { FontNamesType } from "../constants/FontNames";
import { ChildrenProps, MarginProps } from "./GlobalTypes";
import { ReactNode } from "react";
import { IconFamilyType } from "../constants/IconNames";

// interface for AnimatedView
export interface AnimatedViewProps extends Animated.AnimateProps<ViewProps> {
    visible?: boolean;
}

export interface AppViewProps extends ViewProps, ChildrenProps { }

export interface AnimatedTextProps extends Animated.AnimateProps<TextProps>, CustomAppTextProps { }

export interface AppIconProps {
    name?: any;
    family?: IconFamilyType;
    color?: ColorValue;
    size?: number;
    onPress?: ((event: GestureResponderEvent) => void) | any;
    loading?: boolean;
    style?: StyleProp<TextStyle>;
    margins?: MarginProps
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

// interface for TextFieldInput component
export interface TextFieldInputProps extends TextInputProps {
    margins?: MarginProps;
    iconComponent?: ReactNode;
    controlled?: boolean;
}
