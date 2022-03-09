// Packages Imports
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import PushNotification, { Importance } from "react-native-push-notification";

// Local Files/App/Components/Store import
import App from "./App";
import env from "./config/env";
import { store, persistor } from "./store/configureStore";

// Create notification channel
PushNotification.createChannel({
  channelId: env.default_channel_id,
  channelName: env.default_channel_id,
  channelDescription: "A channel to show notifications",
  playSound: true,
  soundName: "default",
  importance: Importance.HIGH,
  vibrate: true,
});

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {});

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
