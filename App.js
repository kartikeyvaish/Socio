import React from "react";
import { connect } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-native-paper";

import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import { ChangeMode } from "./store/theme/actions";
import OfflineNotice from "./components/OfflineNotice";
import Overlay from "./components/Overlay";
import useNotifications from "./hooks/useNotifications";
import useThemeManager from "./hooks/useThemeManager";
import { UpdatePushToken } from "./store/auth/actions";

function App(props) {
  const { ToggleMode, User, SetPushToken, PushToken, Theme, overlayConfig } =
    props;
  // Notification/Push Token handlers using custom hook
  useNotifications(PushToken, SetPushToken);

  // Light/Dark Mode manager using custom hook
  useThemeManager(ToggleMode);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OfflineNotice />
      <Overlay {...overlayConfig} />
      <NavigationContainer theme={Theme}>
        <Provider>{User ? <AppNavigator /> : <AuthNavigator />}</Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
    Theme: state.ThemeState.Theme,
    PushToken: state.AuthState.PushToken,
    overlayConfig: state.UtilsState.overlayConfig,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ToggleMode: (colorScheme) => dispatch(ChangeMode(colorScheme)),
    SetPushToken: (PushToken) => dispatch(UpdatePushToken(PushToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
