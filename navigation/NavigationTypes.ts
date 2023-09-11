// Packages imports
import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";

// App Navigator Screen Params
export type AppStackParamsList = {
    // App Stack Screens
    HomeScreen: undefined;
};

export type AuthStackParamsList = {
    // Auth Stack Screens
    LoginScreen: undefined;
    VerifyLoginOTPScreen: {
        otp_id: string;
        email: string;
    };
    NewUserSignUpScreen: undefined;
    VerifyNewUserSignUpOTPScreen: {
        otp_id: string;
        email: string;
    };
    RegisterScreen: {
        verified_id: number;
        email: string;
        first_name?: string;
        last_name?: string;
        username?: string;
    };
    ForgotPasswordScreen: undefined;
    VerifyForgotPasswordOTPScreen: {
        otp_id: string;
        email: string;
    };
    ResetPasswordScreen: {
        reset_request_id: number;
    };
}

// Props for App Navigator's Screens
export type AppScreenProps<Screen extends keyof AppStackParamsList> = StackScreenProps<
    AppStackParamsList,
    Screen
>;

// Props for Auth Navigator's Screens
export type AuthScreenProps<Screen extends keyof AuthStackParamsList> = StackScreenProps<
    AuthStackParamsList,
    Screen
>;

export interface StackScreenNavigationProp<T extends keyof AppStackParamsList>
    extends CompositeNavigationProp<
        StackNavigationProp<AppStackParamsList, T>,
        StackNavigationProp<AppStackParamsList>
    > { } 