// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';

// Local Imports (components/types/utils)
import AppText from '../components/AppText';
import Container from '../components/Container';

// interface for HomeScreen component
export interface HomeScreenProps {}

// functional component for HomeScreen
function HomeScreen(props: HomeScreenProps) {
  // Destructuring props
  const {} = props;

  // render
  return (
    <Container style={styles.container}>
      <AppText text="Home Screen" />
    </Container>
  );
}

// exports
export default HomeScreen;

// styles for HomeScreen
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
