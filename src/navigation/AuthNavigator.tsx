// Packages Imports
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';

// Screen imports
import EmailSignUpScreen from '../screens/auth/EmailSignUpScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import UserBasicDetailsScreen from '../screens/auth/UserBasicDetailsScreen';
import UsernameSignUpScreen from '../screens/auth/UsernameSignUpScreen';
import VerifyOTPScreen from '../screens/auth/VerifyOTPScreen';

// Types/components/Navigators imports
import { AuthStackParamsList } from './types';

// Create a Stack Navigator
const Stack = createStackNavigator<AuthStackParamsList, 'auth'>();

// Function for AuthNavigator
function AuthNavigator() {
  const { colors } = useTheme();

  const screenOptions: StackNavigationOptions = {
    headerStyle: { backgroundColor: colors.background },
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
  };

  // Render
  return (
    <Stack.Navigator id="auth" screenOptions={screenOptions}>
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      <Stack.Screen name={'EmailSignUpScreen'} component={EmailSignUpScreen} />
      <Stack.Screen name={'VerifyOTPScreen'} component={VerifyOTPScreen} />
      <Stack.Screen name={'UsernameSignUpScreen'} component={UsernameSignUpScreen} />
      <Stack.Screen name={'UserBasicDetailsScreen'} component={UserBasicDetailsScreen} />
      <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} />
    </Stack.Navigator>
  );
}

// Exporting AuthNavigator
export default AuthNavigator;
