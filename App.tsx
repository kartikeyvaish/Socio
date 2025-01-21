// Packages Imports
import { StyleSheet, Text, View } from 'react-native';

// Local imports
import ErrorBoundary from './src/components/ErrorBoundary/ErrorBoundary';

export default function App() {
  const apiUrl = process.env.EXPO_PUBLIC_DEV_SERVER_BASE_URL;

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <Text>{apiUrl}</Text>
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
