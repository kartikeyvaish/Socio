// Local Imports
import { StyleProp, ViewStyle } from "react-native";
import { ChildrenProps } from "./GlobalTypes";
import { TextFieldInputProps } from "./ComponentTypes";
import { ReactNode } from "react";
import { AppButtonProps } from "../components/App/AppButton";

export interface AppFormProps extends ChildrenProps {
    initialValues: object;
    onSubmit: (values: any) => void;
    validationSchema: any;
    isFocused?: boolean;
    resetOnFocus?: boolean;
    validate?: (values: any) => void;
}

export interface AppFormTextFieldProps extends TextFieldInputProps {
    title: string;
    customError?: string;
    containerStyles?: StyleProp<ViewStyle>;
}

export interface AppFormSubmitButtonProps extends Omit<AppButtonProps, 'onPress'> {
    custom?: ReactNode
    shouldTranslate?: boolean;
    onPress?: any;
}