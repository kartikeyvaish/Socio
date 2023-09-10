// Packages Imports
import {
  StackHeaderProps,
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";

// Screen imports
import LoginScreen from "../screens/Auth/LoginScreen";

// Types/components/Navigators imports
import { AuthStackParamsList } from "./NavigationTypes";
import BackButtonHeader from "../components/Headers/BackButtonHeader";
import VerifyLoginOTPScreen from "../screens/Auth/VerifyLoginOTPScreen";
import NewUserSignUpScreen from "../screens/Auth/NewUserSignUpScreen";
import VerifyNewUserOTPScreen from "../screens/Auth/VerifyNewUserOTPScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import VerifyForgotPasswordOTPScreen from "../screens/Auth/VerifyForgotPasswordOTPScreen";
import ResetPasswordScreen from "../screens/Auth/ResetPasswordScreen";

// Stack Navigator
const Stack = createStackNavigator<AuthStackParamsList>();

function getCustomHeader(title: string): StackNavigationOptions {
  return {
    headerShown: true,
    header: ({ navigation }: StackHeaderProps) => (
      <BackButtonHeader onBackPress={() => navigation.goBack()} title={title} />
    ),
  };
}

// Function for AuthNavigator
function AuthNavigator() {
  // Render
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* App Screens */}
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen
        name='VerifyLoginOTPScreen'
        component={VerifyLoginOTPScreen}
        options={() => getCustomHeader("Verify Email")}
      />

      <Stack.Screen
        name='NewUserSignUpScreen'
        component={NewUserSignUpScreen}
        options={() => getCustomHeader("Create Account")}
      />
      <Stack.Screen
        name='VerifyNewUserSignUpOTPScreen'
        component={VerifyNewUserOTPScreen}
        options={() => getCustomHeader("Verify Email")}
      />
      <Stack.Screen
        name='RegisterScreen'
        component={RegisterScreen}
        options={() => getCustomHeader("Create Account")}
      />

      <Stack.Screen
        name='ForgotPasswordScreen'
        component={ForgotPasswordScreen}
        options={() => getCustomHeader("Forgot Password")}
      />
      <Stack.Screen
        name='VerifyForgotPasswordOTPScreen'
        component={VerifyForgotPasswordOTPScreen}
        options={() => getCustomHeader("Verify Email")}
      />
      <Stack.Screen
        name='ResetPasswordScreen'
        component={ResetPasswordScreen}
        options={() => getCustomHeader("Reset Password")}
      />
    </Stack.Navigator>
  );
}

// Exporting AuthNavigator
export default AuthNavigator;
