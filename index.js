// Packages Imports
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import { Audio } from "expo-av";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

// Local Files/App/Components/Store import
import App from "./App";
import { store, persistor } from "./store/configureStore";

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
