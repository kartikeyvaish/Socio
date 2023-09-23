// Packages Imports (from node_modules)
import { StyleSheet } from "react-native";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { RectButton } from "react-native-gesture-handler";

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
import { AppIconProps } from "../types/ComponentTypes";
import { TabsParamsList } from "./NavigationTypes";
import { useAppSelector } from "../store/reduxHooks";

// Create TabNavigator
const Tab = createBottomTabNavigator<TabsParamsList>();

export interface TabItemProps extends AppIconProps {}

function TabItem(props: TabItemProps) {
  const { onPress, ...restProps } = props;

  return (
    <RectButton style={styles.tabItemContainer} onPress={onPress}>
      <AppIcon {...restProps} />
    </RectButton>
  );
}

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
    tabBarStyle: { height: 60 },
    tabBarItemStyle: { height: 60 },
  };

  // render
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeTabScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              family={"Ionicons"}
              name={focused ? "home" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTabScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabItem
              family={"Feather"}
              name={"search"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NewPostTabScreen"
        component={NewPostScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              family={"AntDesign"}
              name={focused ? "pluscircle" : "pluscircleo"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabItem
              family={"Ionicons"}
              name={"people-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTabScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <RectButton style={styles.tabItemContainer}>
              <AppImage
                source={{ uri: user.profile_picture }}
                style={{ width: 24, height: 24, borderRadius: 24 }}
              />
            </RectButton>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// exports
export default AppTabNavigator;

const styles = StyleSheet.create({
  tabItemContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
