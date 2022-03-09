// Packages Imports
import { Pressable, View, StyleSheet } from "react-native";
import { Badge } from "react-native-paper";

// Component Imports
import { AppHeaderProps } from "../types/ComponentTypes";
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import env from "../config/env";
import FontNames from "../constants/FontNames";
import Helper from "../utils/Helper";
import IconNames from "../constants/IconNames";

// function component for AppHeader
function AppHeader(props: AppHeaderProps) {
  // Destructuring props
  const { text = env.application_name, badgeCount, onMessageIconPress, ...otherProps } = props;

  // render
  return (
    <View style={styles.container}>
      <AppText text={text} family={FontNames.BerkshireSwash} size={40} {...otherProps} />
    </View>
  );
}

// exports
export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
