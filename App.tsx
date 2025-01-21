// Packages Imports
import { StyleSheet, Text, View } from 'react-native';

// Local imports
import ErrorBoundary from './src/components/ErrorBoundary/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
