import React from "react";
import { View } from "react-native";
import { Easing } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { useTheme } from "@react-navigation/native";

import EmailSignUp from "./../screens/EmailSignUp";
import EmailVerifyCode from "./../screens/EmailVerifyCode";
import ForgotPassword from "../screens/ForgotPassword";
import IntroScreen from "../screens/IntroScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUp from "../screens/SignUp";
import ScreenNames from "./ScreenNames";

const Stack = createStackNavigator();

function AuthNavigator() {
  const { colors } = useTheme();

  const timingConfig = {
    animation: "timing",
    config: {
      duration: 200,
      easing: Easing.linear,
    },
  };

  const Horizantal = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    transitionSpec: {
      open: timingConfig,
      close: timingConfig,
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen
          name={ScreenNames.LoginScreen}
          component={LoginScreen}
          options={Horizantal}
        />
        <Stack.Screen
          name={ScreenNames.ForgotPassword}
          component={ForgotPassword}
          options={Horizantal}
        />
        <Stack.Screen
          name={ScreenNames.EmailSignUp}
          component={EmailSignUp}
          options={Horizantal}
        />
        <Stack.Screen
          name={ScreenNames.EmailVerifyCode}
          component={EmailVerifyCode}
          options={Horizantal}
        />
        <Stack.Screen
          name={ScreenNames.SignUp}
          component={SignUp}
          options={Horizantal}
        />
      </Stack.Navigator>
    </View>
  );
}

export default AuthNavigator;
