// Packages Imports (from node_modules)
import { View, StyleSheet } from "react-native";

// Local Imports (components/types/utils)

// interface for NotificationsScreen component
export interface NotificationsScreenProps {}

// functional component for NotificationsScreen
function NotificationsScreen(props: NotificationsScreenProps) {
  // Destructuring props
  const {} = props;

  // render
  return <View style={styles.container}></View>;
}

// exports
export default NotificationsScreen;

// styles for NotificationsScreen
const styles = StyleSheet.create({
  container: {},
});
