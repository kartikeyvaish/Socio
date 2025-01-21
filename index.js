// Packages Imports
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";

// Local Files/App/Components/Store import
import App from "./App";;

// Headless Check for PushNotifications
function HeadlessCheck({ isHeadless }) {
  return isHeadless ? null : (
    <App />
  );
}

// registering the App
AppRegistry.registerComponent("main", () => HeadlessCheck);