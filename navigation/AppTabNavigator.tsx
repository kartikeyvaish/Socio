// Packages Imports (from node_modules)
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

// Screen imports
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import NewPostScreen from "../screens/NewPostScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";

// Local Imports
import AppIcon from "../components/App/AppIcon";
import AppImage from "../components/App/AppImage";

// Named Imports
import { TabsParamsList } from "./NavigationTypes";
import { useAppSelector } from "../store/reduxHooks";

// Create TabNavigator
const Tab = createBottomTabNavigator<TabsParamsList>();

// Local Imports (components/types/utils)

// functional component for AppTabNavigator
function AppTabNavigator() {
  // Get the theme
  const { colors } = useAppSelector(state => state.theme);

  const user = useAppSelector(state => state.auth);

  // Tab Bar Universal Options
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    headerTintColor: colors.text,
    headerTransparent: true,
    tabBarActiveTintColor: colors.text,
    tabBarInactiveTintColor: colors.text,
    tabBarActiveBackgroundColor: colors.background,
    tabBarInactiveBackgroundColor: colors.background,
    tabBarShowLabel: false,
  };

  // render
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name='HomeTabScreen'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AppIcon
              family={"Ionicons"}
              name={focused ? "home" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name='SearchTabScreen'
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AppIcon family={"Feather"} name={"search"} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='NewPostTabScreen'
        component={NewPostScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AppIcon family={"Ionicons"} name={"people-outline"} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='NotificationsScreen'
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AppIcon family={"Ionicons"} name={"people-outline"} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='ProfileTabScreen'
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <AppImage
              source={{ uri: user.profile_picture }}
              style={{ width: 24, height: 24, borderRadius: 24 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// exports
export default AppTabNavigator;
