// Packages Imports
import { useContext } from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";

// Components/Utils imports
import AppBottomTabBar from "./AppBottomTabBar";
import AppIcon from "../components/AppIcon";
import AppImage from "../components/AppImage";
import ColorPallete from "../constants/ColorPallete";
import GlobalContext from "../context/GlobalContext";
import IconNames from "../constants/IconNames";
import ScreenNames from "./ScreenNames";
import { TabsParamsList } from "./NavigationProps";

// Screens Imports
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import NewPostScreen from "../screens/NewPost/NewPostScreen";
import FollowRequestsScreen from "../screens/FollowRequests/FollowRequestsScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

// Create TabNavigator
const Tab = createBottomTabNavigator<TabsParamsList>();

// function component for TabNavigator
function TabNavigator() {
  // Get the theme
  const { colors } = useTheme();

  // get the global context
  const { User, Requests } = useContext(GlobalContext);

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
    <Tab.Navigator screenOptions={screenOptions} tabBar={props => <AppBottomTabBar {...props} />}>
      <Tab.Screen
        name={ScreenNames.HomeTabScreen}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AppIcon
              family={IconNames.Ionicons}
              name={focused ? "home" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.SearchTabScreen}
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AppIcon family={IconNames.Feather} name={"search"} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.NewPostTabScreen}
        component={NewPostScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AppIcon
              family={IconNames.AntDesign}
              name={focused ? "pluscircle" : "pluscircleo"}
              color={focused ? ColorPallete.white : color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.FollowRequestsTabScreen}
        component={FollowRequestsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AppIcon family={IconNames.Ionicons} name={"people-outline"} color={color} size={24} />
          ),
          tabBarBadge: Requests.length,
        }}
      />
      <Tab.Screen
        name={ScreenNames.ProfileTabScreen}
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <AppImage
              uri={User.profile_picture}
              borderRadius={24}
              style={{ width: 24, height: 24, borderRadius: 24 }}
              borderWidth={2}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// exports
export default TabNavigator;
