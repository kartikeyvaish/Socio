// Packages Imports
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';

// Screen imports
import HomeScreen from '../screens/HomeScreen';

// Types/components/Navigators imports
import { AppStackParamsList } from './types';

// Create a Stack Navigator
const Stack = createStackNavigator<AppStackParamsList, 'app'>();

// Function for AppNavigator
function AppNavigator() {
  const { colors } = useTheme();

  const screenOptions: StackNavigationOptions = {
    headerStyle: { backgroundColor: colors.background },
    headerShown: false
  };

  // Render
  return (
    <Stack.Navigator id="app" screenOptions={screenOptions}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
    </Stack.Navigator>
  );
}

// Exporting AppNavigator
export default AppNavigator;
