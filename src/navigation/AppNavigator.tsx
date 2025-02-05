// Packages Imports
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';

// Screen imports
import BackButtonHeader from '../components/BackButtonHeader';
import BottomTabNavigator from './BottomTabNavigator';
import PostListScreen from '../screens/misc/PostListScreen';

// Types/components/Navigators imports
import { AppStackParamsList } from './types';

// Create a Stack Navigator
const Stack = createStackNavigator<AppStackParamsList, 'app'>();

// Function for AppNavigator
function AppNavigator() {
  const { colors } = useTheme();

  const screenOptions: StackNavigationOptions = {
    headerStyle: { backgroundColor: colors.background },
    headerShown: false,
    header: (headerProps) => <BackButtonHeader {...headerProps} />
  };

  // Render
  return (
    <Stack.Navigator id="app" screenOptions={screenOptions}>
      <Stack.Screen name={'HomeScreen'} component={BottomTabNavigator} />
      <Stack.Screen
        name={'PostListScreen'}
        component={PostListScreen}
        options={{ headerShown: true, headerTitle: 'Post List' }}
      />
    </Stack.Navigator>
  );
}

// Exporting AppNavigator
export default AppNavigator;
