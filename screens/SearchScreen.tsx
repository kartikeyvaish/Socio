// Packages Imports (from node_modules)
import { View, StyleSheet } from "react-native";

// Local Imports (components/types/utils)

// interface for SearchScreen component
export interface SearchScreenProps {}

// functional component for SearchScreen
function SearchScreen(props: SearchScreenProps) {
  // Destructuring props
  const {} = props;

  // render
  return <View style={styles.container}></View>;
}

// exports
export default SearchScreen;

// styles for SearchScreen
const styles = StyleSheet.create({
  container: {},
});
