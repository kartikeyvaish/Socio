import React, { useState } from "react";
import { StyleSheet, Dimensions, Keyboard } from "react-native";
import { Formik } from "formik";

import API from "../api/API";
import config from "../config/config";
import Container from "./../components/Container";
import RegisterSchema from "../schema/RegisterSchema";
import Text from "./../components/Text";
import TextInput from "./../components/TextInput";
import Toast from "../components/Toast";
import RoundButton from "../components/RoundButton";
import ScreenNames from "../navigation/ScreenNames";

const ScreenWidth = Dimensions.get("screen").width;

const InitialValues = RegisterSchema.SignUpInitialValues;
const ValidationSchema = RegisterSchema.EmailSignUpSchema();

function EmailSignUp({ navigation }) {
  const [Loading, SetLoading] = useState(false);

  const CheckEmailProceed = async (values) => {
    try {
      Keyboard.dismiss();
      SetLoading(true);
      const response = await API.Send_Email_Register_OTP(values.Email);
      if (response.ok) {
        navigation.replace(ScreenNames.EmailVerifyCode, {
          Email: values.Email,
          OTP_ID: response.data.response._id,
        });
      } else {
        Toast.show({ text: response.data.response });
        SetLoading(false);
      }
    } catch (error) {
      Toast.show({ text: config.messages.ServerError });
      SetLoading(false);
    }
  };

  return (
    <Container style={styles.container}>
      <Text text="What's your email?" size={22} />

      <Formik
        initialValues={InitialValues}
        onSubmit={(values) => CheckEmailProceed(values)}
        validationSchema={ValidationSchema}
      >
        {({ handleChange, setFieldTouched, handleSubmit, errors, touched }) => (
          <>
            <TextInput
              label="Email"
              mode="flat"
              keyboardType="email-address"
              onChangeText={handleChange("Email")}
              error={errors.Email}
              onBlur={() => setFieldTouched("Email")}
              errorVisibilty={touched.Email === true ? true : false}
              helperPadding="normal"
            />

            <RoundButton
              Name="AntDesign"
              marginTop={20}
              style={{ alignSelf: "center" }}
              IconName="arrowright"
              color="white"
              loading={Loading}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </Container>
  );
}

export default EmailSignUp;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingTop: 30,
    paddingRight: 15,
    width: ScreenWidth,
  },
  innerContainer: {
    flex: 1,
    width: ScreenWidth,
    paddingLeft: 15,
    paddingRight: 15,
  },
  RemainingBox: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 20,
  },
  ImageBox: {
    alignItems: "center",
  },
  Image: {
    width: 80,
    height: 80,
    borderRadius: 100,
    resizeMode: "cover",
  },
  RemoveBTN: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 50,
  },
});
