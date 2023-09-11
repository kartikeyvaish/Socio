// Packages Imports (from node_modules)
import { StyleSheet } from "react-native";
import { useAppDispatch } from "../store/reduxHooks";

// Local Imports (components/types/utils)
import AppContainer from "../components/App/AppContainer";
import AppButton from "../components/App/AppButton";
import authActions from "../store/auth/actions";

// interface for HomeScreen component
export interface HomeScreenProps {}

// functional component for HomeScreen
function HomeScreen(props: HomeScreenProps) {
  // Destructuring props
  const {} = props;

  const dispatch = useAppDispatch();

  // render
  return (
    <AppContainer style={styles.container}>
      <AppButton title='Logout' onPress={() => dispatch(authActions.logoutUser())} />
    </AppContainer>
  );
}

// exports
export default HomeScreen;

// styles for HomeScreen
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
  },
});
