// Packages Imports
import { createStackNavigator } from "@react-navigation/stack";

// Screen imports
import EmailOTPSignUpVerifyScreen from "../screens/Auth/EmailOTPSignUpVerifyScreen";
import EmailSignUpScreen from "../screens/Auth/EmailSignUpScreen";
import ForgotPasswordEmailResetScreen from "../screens/Auth/ForgotPasswordEmailResetScreen";
import ForgotPasswordOTPVerifyScreen from "../screens/Auth/ForgotPasswordOTPVerifyScreen";
import IntroductionScreen from "./../screens/Auth/IntroductionScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import ResetPasswordScreen from "../screens/Auth/ResetPasswordScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";

// Types/components/Navigators imports
import AnimatedView from "../components/AnimatedView";
import { AuthStackParamsList } from "./NavigationProps";
import ScreenNames from "./ScreenNames";

// Stack Navigator
const Stack = createStackNavigator<AuthStackParamsList>();

// Function for AuthNavigator
function AuthNavigator() {
  // Render
  return (
    <AnimatedView>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* App Screens */}
        <Stack.Screen name={ScreenNames.IntroductionScreen} component={IntroductionScreen} />
        <Stack.Screen name={ScreenNames.EmailSignUpScreen} component={EmailSignUpScreen} />
        <Stack.Screen name={ScreenNames.LoginScreen} component={LoginScreen} />
        <Stack.Screen name={ScreenNames.SignUpScreen} component={SignUpScreen} />
        <Stack.Screen
          name={ScreenNames.EmailOTPSignUpVerifyScreen}
          component={EmailOTPSignUpVerifyScreen}
        />
        <Stack.Screen
          name={ScreenNames.ForgotPasswordEmailResetScreen}
          component={ForgotPasswordEmailResetScreen}
        />
        <Stack.Screen
          name={ScreenNames.ForgotPasswordOTPVerifyScreen}
          component={ForgotPasswordOTPVerifyScreen}
        />
        <Stack.Screen name={ScreenNames.ResetPasswordScreen} component={ResetPasswordScreen} />
      </Stack.Navigator>
    </AnimatedView>
  );
}

// Exporting AuthNavigator
export default AuthNavigator;
