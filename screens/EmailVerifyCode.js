import React, { useState } from "react";
import { StyleSheet, Keyboard } from "react-native";

import API from "../api/API";
import Button from "../components/Button";
import config from "../config/config";
import Container from "../components/Container";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import Toast from "../components/Toast";

function EmailVerifyCode({ navigation, route }) {
  const [OTP, SetOTP] = useState("");
  const [Loading, SetLoading] = useState(false);

  const VerifyCode = async () => {
    try {
      Keyboard.dismiss();
      SetLoading(true);
      const response = await API.VerifyOTP({
        _id: route.params.OTP_ID,
        OTP: OTP,
      });

      SetLoading(false);
      if (response.ok) {
        navigation.replace("SignUp", route.params);
      } else {
        Toast.show({ text: response.data });
      }
    } catch (error) {
      SetLoading(false);
      Toast.show({ text: config.messages.ServerError });
    }
  };

  return (
    <Container style={styles.container}>
      <Text
        text="An OTP has been sent to your Email address to verify your account. Please enter that OTP below"
        size={20}
        family="InterBold"
        marginTop={10}
      />

      <Text
        text="If you did not recieve the OTP, then please check your spam folders also."
        size={18}
        marginBottom={10}
      />

      <TextInput
        label="OTP"
        keyboardType="numeric"
        onChangeText={(text) => SetOTP(text)}
        helperPadding="normal"
      />

      <Button
        title="Verify Email"
        marginTop={20}
        width="80%"
        style={{ alignSelf: "center" }}
        loading={Loading}
        onPress={VerifyCode}
      />
    </Container>
  );
}

export default EmailVerifyCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  RemainingBox: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 20,
  },
});
