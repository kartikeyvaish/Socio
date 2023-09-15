// Packages Imports (from node_modules)
import { View, StyleSheet } from "react-native";

// Local Imports (components/types/utils)

// interface for ProfileScreen component
export interface ProfileScreenProps {}

// functional component for ProfileScreen
function ProfileScreen(props: ProfileScreenProps) {
  // Destructuring props
  const {} = props;

  // render
  return <View style={styles.container}></View>;
}

// exports
export default ProfileScreen;

// styles for ProfileScreen
const styles = StyleSheet.create({
  container: {},
});
