// Packages Imports (from node_modules)
import { View, StyleSheet } from "react-native";

// Local Imports (components/types/utils)

// interface for NewUserSignUpScreen component
export interface NewUserSignUpScreenProps {}

// functional component for NewUserSignUpScreen
function NewUserSignUpScreen(props: NewUserSignUpScreenProps) {
  // Destructuring props
  const {} = props;

  // render
  return <View style={styles.container}></View>;
}

// exports
export default NewUserSignUpScreen;

// styles for NewUserSignUpScreen
const styles = StyleSheet.create({
  container: {},
});
