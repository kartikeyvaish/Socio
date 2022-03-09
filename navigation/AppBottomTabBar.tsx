// Packages Imports
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Animated, { Layout as LT } from "react-native-reanimated";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";

// utils imports
import Layout from "../constants/Layout";
import TabBarCard from "./TabBarCard";

// Constants
const ScreenWidth = Layout.window.width;
const TabBarSideOffset = 5;

// function component for AppBottomTabBar
function AppBottomTabBar(props: BottomTabBarProps) {
  // Destructuring props
  const { state, descriptors, navigation } = props;

  const { colors } = useTheme();

  // total number of tabs
  const tabsCount = state.routes.length;

  // current index of the tab
  const currentFocusedTab = state.index;

  const eachTabLength = (ScreenWidth - 2 * TabBarSideOffset) / tabsCount;

  // Styles for the view taht slides the tab bar
  const maskViewStyles: StyleProp<ViewStyle> = [
    styles.maskViewContainer,
    {
      width: currentFocusedTab === 2 ? eachTabLength : eachTabLength / 2,
      left:
        currentFocusedTab === 2
          ? eachTabLength * currentFocusedTab
          : eachTabLength * currentFocusedTab + eachTabLength / 4,
      height: currentFocusedTab === 2 ? 50 : 3,
    },
  ];

  // Render tabs
  return (
    <View style={[styles.tabBarContainer, { backgroundColor: colors.background }]}>
      {state.routes.map((route, index) => {
        // Get the tabBar Icon for a given route
        const { tabBarIcon } = descriptors[route.key].options;
        const { tabBarActiveTintColor, tabBarInactiveTintColor, tabBarBadge } =
          descriptors[route.key].options;

        // Constants
        const focused = currentFocusedTab === index;
        const color = focused ? tabBarActiveTintColor : tabBarInactiveTintColor;
        const size = 30;

        // Onpress of a tab
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name);
          }
        };

        // Render a tab
        return (
          <TabBarCard
            onPress={onPress}
            key={route.key}
            customComponent={() => tabBarIcon({ color, focused, size })}
            badgeCount={tabBarBadge}
          />
        );
      })}

      {/* This is a mask for the tabs which slides */}
      <Animated.View layout={LT} style={maskViewStyles} />
    </View>
  );
}

// exports
export default AppBottomTabBar;

// styles
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: TabBarSideOffset,
    marginRight: TabBarSideOffset,
    marginBottom: TabBarSideOffset,
    overflow: "hidden",
    elevation: 30,
  },
  maskViewContainer: {
    position: "absolute",
    backgroundColor: "dodgerblue",
    zIndex: 0,
    bottom: 5,
    borderRadius: 100,
    alignSelf: "center",
  },
});
