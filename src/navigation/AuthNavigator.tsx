// Packages Imports
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';

// Screen imports
import LoginScreen from '../screens/auth/LoginScreen';

// Types/components/Navigators imports
import { AuthStackParamsList } from './types';

// Create a Stack Navigator
const Stack = createStackNavigator<AuthStackParamsList, 'auth'>();

// Function for AuthNavigator
function AuthNavigator() {
  const { colors } = useTheme();

  const screenOptions: StackNavigationOptions = {
    headerStyle: { backgroundColor: colors.background },
    headerShown: false
  };

  // Render
  return (
    <Stack.Navigator id="auth" screenOptions={screenOptions}>
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
    </Stack.Navigator>
  );
}

// Exporting AuthNavigator
export default AuthNavigator;
