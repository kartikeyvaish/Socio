// Packages Imports
import { StyleSheet, Text, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

// Local imports
import ErrorBoundary from './src/components/ErrorBoundary';

// Named Imports
import { persistor, store } from './src/store';

export default function App() {
  const apiUrl = process.env.EXPO_PUBLIC_DEV_SERVER_BASE_URL;

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <Text>{apiUrl}</Text>
          </View>
        </PersistGate>
      </Provider>
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
