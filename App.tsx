// Packages Imports
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
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
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={styles.container}>
                  <Text>{apiUrl}</Text>
                </View>
              </GestureHandlerRootView>
            </SafeAreaView>
          </SafeAreaProvider>
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
