// Packages Imports
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import { Audio } from "expo-av";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";

// Local Files/App/Components/Store import
import App from "./App";
import { store, persistor } from "./store/configureStore";

// Prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

// Set audio mode to play in silent mode
Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

// Headless Check for PushNotifications
function HeadlessCheck({ isHeadless }) {
  return isHeadless ? null : (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

// registering the App
AppRegistry.registerComponent("main", () => HeadlessCheck);
