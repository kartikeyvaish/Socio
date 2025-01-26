// Packages Imports (from node_modules)
import { StyleSheet, Text, View } from 'react-native';

// Local Imports (components/types/utils)
import colorPallete from '../constants/colorPallete';

// functional component for ErrorBoundaryFallback
function ErrorBoundaryFallback() {
  // render
  return (
    <View style={styles.container}>
      <Text>Something Went Wrong...We're working on it.</Text>
    </View>
  );
}

// exports
export default ErrorBoundaryFallback;

// styles for ErrorBoundaryFallback
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPallete.white
  }
});
