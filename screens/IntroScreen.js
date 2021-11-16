import React from "react";
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
import { Login } from "../store/actions";
import Text from "../components/Text";

const googleApiClientID = config.googleApiClientID;

GoogleSignin.configure({
  webClientId: googleApiClientID,
});

function IntroScreen({ navigation, SetUser }) {
  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      await GoogleSignin.signOut();
      const response = await GoogleSignin.signIn();

      const apiResponse = await API.GoogleLogin(response.idToken);

      if (apiResponse.ok) SetUser(apiResponse.data.User);
      else ToastAndroid.show(apiResponse.data, ToastAndroid.LONG);
    } catch (error) {
      console.log(error);
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
            onPress={() => navigation.navigate("LoginScreen")}
            style={{ borderRadius: 50 }}
          />
          <Button
            title="Login With Google"
            backgroundColor={ColorPallete.red}
            marginBottom={10}
            contentStyle={{ height: 60 }}
            onPress={onGoogleButtonPress}
            style={{ borderRadius: 50 }}
          />
          <Button
            title="Create Account"
            backgroundColor={ColorPallete.grandis}
            marginBottom={10}
            contentStyle={{ height: 60 }}
            onPress={() => navigation.navigate("EmailSignUp")}
            style={{ borderRadius: 50 }}
          />
        </View>
      </ImageBackground>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    SetUser: (User) => dispatch(Login(User)),
  };
};

export default connect(null, mapDispatchToProps)(IntroScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "rgba(0,0,0,1)",
  },
});
