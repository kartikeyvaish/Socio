// Packages Imports (from node_modules)
import { View, StyleSheet } from "react-native";

// Local Imports (components/types/utils)

// interface for NewPostScreen component
export interface NewPostScreenProps {}

// functional component for NewPostScreen
function NewPostScreen(props: NewPostScreenProps) {
  // Destructuring props
  const {} = props;

  // render
  return <View style={styles.container}></View>;
}

// exports
export default NewPostScreen;

// styles for NewPostScreen
const styles = StyleSheet.create({
  container: {},
});
