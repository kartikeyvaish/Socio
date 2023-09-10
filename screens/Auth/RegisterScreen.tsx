// Packages Imports (from node_modules)
import { View, StyleSheet } from "react-native";

// Local Imports (components/types/utils)

// interface for RegisterScreen component
export interface RegisterScreenProps {}

// functional component for RegisterScreen
function RegisterScreen(props: RegisterScreenProps) {
  // Destructuring props
  const {} = props;

  // render
  return <View style={styles.container}></View>;
}

// exports
export default RegisterScreen;

// styles for RegisterScreen
const styles = StyleSheet.create({
  container: {},
});
