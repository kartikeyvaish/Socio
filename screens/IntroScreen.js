import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ToastAndroid,
} from "react-native";
import { connect } from "react-redux";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import API from "../api/API";
import Button from "../components/Button";
import config from "../config/config";
import ColorPallete from "../config/ColorPallete";
import { Login } from "../store/auth/actions";
import Text from "../components/Text";
import ScreenNames from "../navigation/ScreenNames";

const googleApiClientID = config.googleApiClientID;

GoogleSignin.configure({
  webClientId: googleApiClientID,
});

function IntroScreen({ navigation, SetUser, PushToken }) {
  const [Loading, SetLoading] = useState(false);

  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      SetLoading(true);
      await GoogleSignin.signOut();
      const response = await GoogleSignin.signIn();

      const apiResponse = await API.GoogleLogin({
        Token: response.idToken,
        PushNotificationToken: PushToken,
      });

      if (apiResponse.ok) SetUser(apiResponse.data.User);
      else {
        SetLoading(false);
        ToastAndroid.show(apiResponse.data, ToastAndroid.LONG);
      }
    } catch (error) {
      SetLoading(false);
    }
  }

  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={ColorPallete.primary}
        animated={true}
        showHideTransition="slide"
      />
      <ImageBackground
        source={{ uri: "asset:/images/IntroScreen.jpg" }}
        style={styles.container}
        imageStyle={{ opacity: 0.4 }}
      >
        <Text
          text={config.appName}
          family="BerkshireSwash"
          size={60}
          color="white"
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          marginTop={10}
        />
        <Text
          text={config.tagLine}
          marginTop={10}
          family="Inter"
          size={22}
          color="white"
        />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Button
            title="Login with Email"
            backgroundColor={ColorPallete.primary}
            marginBottom={10}
            contentStyle={{ height: 60 }}
            onPress={() => navigation.navigate(ScreenNames.LoginScreen)}
            style={{ borderRadius: 50 }}
          />
          <Button
            title="Login With Google"
            backgroundColor={ColorPallete.red}
            marginBottom={10}
            contentStyle={{ height: 60 }}
            onPress={onGoogleButtonPress}
            style={{ borderRadius: 50 }}
            loading={Loading}
          />
          <Button
            title="Create Account"
            backgroundColor={ColorPallete.grandis}
            marginBottom={10}
            contentStyle={{ height: 60 }}
            onPress={() => navigation.navigate(ScreenNames.EmailSignUp)}
            style={{ borderRadius: 50 }}
          />
        </View>
      </ImageBackground>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    PushToken: state.AuthState.PushToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetUser: (User) => dispatch(Login(User)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "rgba(0,0,0,1)",
  },
});
