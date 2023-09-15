// Packages Imports
import {
  StackHeaderProps,
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";

// Screen imports
import AppTabNavigator from "./AppTabNavigator";

// Types/components/Navigators imports
import { AppStackParamsList } from "./NavigationTypes";
import BackButtonHeader from "../components/Headers/BackButtonHeader";

// Stack Navigator
const Stack = createStackNavigator<AppStackParamsList>();

function getCustomHeader(title: string): StackNavigationOptions {
  return {
    headerShown: true,
    header: ({ navigation }: StackHeaderProps) => (
      <BackButtonHeader onBackPress={() => navigation.goBack()} title={title} />
    ),
  };
}

// Function for AppNavigator
function AppNavigator() {
  // Render
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* App Screens */}
      <Stack.Screen name='HomeScreen' component={AppTabNavigator} />
    </Stack.Navigator>
  );
}

// Exporting AppNavigator
export default AppNavigator;
