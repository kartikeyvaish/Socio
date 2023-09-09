// Packages Imports (from node_modules)
import { View, StyleSheet } from "react-native";

// Local Imports (components/types/utils)
import AppContainer from "../components/App/AppContainer";

// interface for LoginScreen component
export interface LoginScreenProps {}

// functional component for LoginScreen
function LoginScreen(props: LoginScreenProps) {
  // Destructuring props
  const {} = props;

  // render
  return <AppContainer></AppContainer>;
}

// exports
export default LoginScreen;

// styles for LoginScreen
const styles = StyleSheet.create({
  container: {},
});
