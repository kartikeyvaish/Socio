// Packages Imports
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

// Local imports
import AppSafeAreaProvider from './src/provider/AppSafeAreaProvider';
import CommentsDetailsProvider from './src/provider/CommentsDetailsProvider';
import ErrorBoundary from './src/components/ErrorBoundary';
import FileCacheManager from './src/provider/FileCacheManager';
import Navigation from './src/navigation/Navigation';
import ThemedLayout from './src/layouts/ThemedLayout';

// Named Imports
import { persistor, store } from './src/store';

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemedLayout>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <FileCacheManager>
                <CommentsDetailsProvider>
                  <AppSafeAreaProvider>
                    <Navigation />
                  </AppSafeAreaProvider>
                </CommentsDetailsProvider>
              </FileCacheManager>
            </GestureHandlerRootView>
          </ThemedLayout>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
