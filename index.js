// Packages Imports
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import { Audio } from "expo-av";
import * as SplashScreen from "expo-splash-screen";

// Local Files/App/Components/Store import
import App from "./App";

// Set audio mode to play in silent mode
Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

// Prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

// Headless Check for PushNotifications
function HeadlessCheck({ isHeadless }) {
  return isHeadless ? null : <App />;
}

// registering the App
AppRegistry.registerComponent("main", () => HeadlessCheck);
