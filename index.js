import "react-native-gesture-handler";
import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import PushNotification, { Importance } from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { store, persistor } from "./store/configureStore";

PushNotification.createChannel(
  {
    channelId: "SocioDefault",
    channelName: "SocioDefault",
    channelDescription: "A channel to show notifications",
    playSound: true,
    soundName: "default",
    importance: Importance.HIGH,
    vibrate: true,
  },
  (created) => {}
);

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {});

function HeadlessCheck({ isHeadless }) {
  return isHeadless ? null : (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent("main", () => HeadlessCheck);
