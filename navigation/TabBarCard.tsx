// Packages Imports
import { StyleSheet, Pressable } from "react-native";
import AppBadge from "../components/AppBadge";

// Component Imports
import AppIcon from "../components/AppIcon";
import AppText from "../components/AppText";
import IconNames from "../constants/IconNames";
import { TabBarCardProps } from "./NavigationProps";

// function component for TabBarCard
function TabBarCard(props: TabBarCardProps) {
  // Destructuring props
  const { onPress, style, label, customComponent, badgeCount } = props;

  // render
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      {customComponent ? (
        customComponent()
      ) : (
        <>
          <AppIcon family={IconNames.AntDesign} name="home" size={23} marginBottom={5} />
          <AppText text={label} />
        </>
      )}

      {badgeCount ? (
        <AppBadge
          badgeCount={parseInt(badgeCount.toString())}
          badgeContainerStyle={{ position: "absolute", top: 5, right: 15 }}
        />
      ) : null}
    </Pressable>
  );
}

// exports
export default TabBarCard;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rippleContainer: {
    flex: 1,
    zIndex: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
