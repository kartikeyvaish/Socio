import React from "react";
import { View, StyleSheet, ImageBackground, StatusBar } from "react-native";

import Button from "../components/Button";
import config from "../config/config";
import ColorPallete from "../config/ColorPallete";
import Text from "../components/Text";

function IntroScreen({ navigation }) {
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
            title="LOGIN"
            backgroundColor={ColorPallete.primary}
            marginBottom={10}
            contentStyle={{ height: 60 }}
            onPress={() => navigation.navigate("LoginScreen")}
            style={{ borderRadius: 50 }}
          />
          <Button
            title="REGISTER"
            backgroundColor={ColorPallete.red}
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

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "rgba(0,0,0,1)",
  },
});
