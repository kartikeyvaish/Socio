import React, { useEffect } from "react";
import { Appearance } from "react-native";
import { connect } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-native-paper";
import PushNotification from "react-native-push-notification";

import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import { ChangeMode } from "./store/theme/actions";
import { LocalNotification } from "./hooks/useNotifications";
import { UpdatePushToken } from "./store/auth/actions";

function App(props) {
  const { ToggleMode, User, SetPushToken, PushToken, Theme } = props;

  // Push Notification Setup
  useEffect(() => {
    PushNotification.configure({
      onRegister: onRegister,
      onNotification: onNotification,

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  // Appearance Change UseEffect
  useEffect(() => {
    Appearance.addChangeListener(onThemeChange);

    return () => Appearance.removeChangeListener(onThemeChange);
  }, []);

  // Function to execute on notification arrival
  const onNotification = async (notification) => {
    try {
      if (notification.data !== null) {
        if (notification.data.showInForeGround === "false") return;

        const DATA = notification.data || {};
        const NOTIFICATIONS = notification.notification || {};
        const NotifyData = {
          ...NOTIFICATIONS,
          ...DATA,
        };
        LocalNotification(NotifyData);
      }
    } catch (error) {}
  };

  // Funtion to execute on token fetch
  const onRegister = async (token) => {
    try {
      if (token?.token && PushToken !== token?.token) SetPushToken(token.token);
    } catch (error) {}
  };

  // Function to execute on phone theme change
  const onThemeChange = ({ colorScheme }) => ToggleMode(colorScheme);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ToggleMode: (colorScheme) => dispatch(ChangeMode(colorScheme)),
    SetPushToken: (PushToken) => dispatch(UpdatePushToken(PushToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
