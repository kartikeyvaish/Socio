import React, { useState } from "react";
import { StyleSheet, ToastAndroid, Keyboard } from "react-native";
import { connect } from "react-redux";
import { Formik } from "formik";

import API from "../api/API";
import Button from "../components/Button";
import config from "../config/config";
import ColorPallete from "../config/ColorPallete";
import Container from "../components/Container";
import ForgotPasswordSchema from "../schema/ForgotPasswordSchema";
import { Login } from "../store/auth/actions";
import Text from "../components/Text";
import TextInput from "../components/TextInput";

const InitialValues = ForgotPasswordSchema.InitialValues;
const ValidationSchema = ForgotPasswordSchema.ForgotPasswordSchema();

function ForgotPassword({ SetUser, PushToken }) {
  const [CodeSent, SetCodeSent] = useState(false);
  const [CodeVerified, SetCodeVerified] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [OTP_ID, SetOTP_ID] = useState(null);

  const SendCode = async (values) => {
    try {
      Keyboard.dismiss();
      SetLoading(true);
      const response = await API.SendForgotPassOTP({ Email: values.Email });
      if (response.ok) {
        SetOTP_ID(response.data.response._id);
        SetCodeSent(true);
      } else {
        ToastAndroid.show(response.data, ToastAndroid.LONG);
      }
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  const VerifyOTP = async (values) => {
    try {
      Keyboard.dismiss();
      SetLoading(true);
      const response = await API.VerifyOTP({
        _id: OTP_ID,
        OTP: values.OTP,
      });

      if (response.ok) {
        SetCodeVerified(true);
      } else {
        ToastAndroid.show(response.data, ToastAndroid.LONG);
      }
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
      ToastAndroid.show(config.messages.ServerError, ToastAndroid.LONG);
    }
  };

  const Login = async (Email, Password) => {
    try {
      Keyboard.dismiss();
      SetLoading(true);
      const response = await API.Login({
        Email: Email,
        Password: Password,
        PushToken: PushToken,
      });
      SetLoading(false);

      if (response.ok) await SetUser(response.data.User);
      else
        ToastAndroid.show(response.data || response.problem, ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show(config.messages.ServerError, ToastAndroid.LONG);
      SetLoading(false);
    }
  };

  const ResetPassword = async (values) => {
    try {
      Keyboard.dismiss();
      SetLoading(true);
      const response = await API.ResetPassword({
        Email: values.Email,
        Password: values.NewPassword,
        OTP_ID: OTP_ID,
      });

      if (response.ok) {
        await Login(values.Email, values.NewPassword);
      } else {
        ToastAndroid.show(response.data, ToastAndroid.LONG);
        SetLoading(false);
      }
    } catch (error) {
      SetLoading(false);
      ToastAndroid.show(config.messages.ServerError, ToastAndroid.LONG);
    }
  };

  return (
    <Container style={styles.container}>
      <Text
        text="An OTP will be sent to your Email address to verify your account"
        size={20}
        family="InterBold"
        marginTop={10}
        marginBottom={10}
      />

      <Formik
        initialValues={InitialValues}
        onSubmit={(values) => ResetPassword(values)}
        validationSchema={ValidationSchema}
      >
        {({
          handleChange,
          setFieldTouched,
          handleSubmit,
          errors,
          touched,
          isValid,
          values,
        }) => (
          <>
            <TextInput
              label="Email Address"
              keyboardType="email-address"
              disabled={CodeSent}
              onChangeText={handleChange("Email")}
              error={errors.Email}
              onBlur={() => setFieldTouched("Email")}
              errorVisibilty={touched.Email === true ? true : false}
              helperPadding="normal"
            />

            {CodeSent === false ? (
              <Button
                title="Send OTP"
                marginTop={20}
                width="80%"
                style={{ alignSelf: "center" }}
                labelColor="black"
                backgroundColor={ColorPallete.grandis}
                loading={Loading}
                onPress={() => SendCode(values)}
                disabled={
                  CodeSent || values.Email.length === 0 || errors?.Email
                    ? true
                    : false
                }
              />
            ) : null}

            {CodeSent && CodeVerified === false ? (
              <>
                <TextInput
                  label="6-digit OTP"
                  mode="outlined"
                  secureTextEntry={true}
                  onChangeText={handleChange("OTP")}
                  maxLength={6}
                  keyboardType="numeric"
                  error={errors.OTP}
                  onBlur={() => setFieldTouched("OTP")}
                  errorVisibilty={touched.OTP === true ? true : false}
                  helperPadding="normal"
                />

                <Button
                  title="Verify OTP"
                  marginTop={20}
                  width="80%"
                  style={{ alignSelf: "center" }}
                  loading={Loading}
                  onPress={() => VerifyOTP(values)}
                />
              </>
            ) : null}

            {CodeVerified ? (
              <>
                <TextInput
                  label="New Password"
                  mode="flat"
                  secureTextEntry={true}
                  onChangeText={handleChange("NewPassword")}
                  error={errors.NewPassword}
                  onBlur={() => setFieldTouched("NewPassword")}
                  errorVisibilty={touched.NewPassword === true ? true : false}
                  helperPadding="normal"
                />

                <TextInput
                  label="Confirm New Password"
                  mode="flat"
                  secureTextEntry={true}
                  onChangeText={handleChange("ConfirmNewPassword")}
                  error={errors.ConfirmNewPassword}
                  onBlur={() => setFieldTouched("ConfirmNewPassword")}
                  errorVisibilty={
                    touched.ConfirmNewPassword === true ? true : false
                  }
                  helperPadding="normal"
                />

                <Button
                  title="Reset Password"
                  marginTop={20}
                  width="80%"
                  style={{ alignSelf: "center" }}
                  loading={Loading}
                  disabled={!isValid}
                  onPress={handleSubmit}
                />
              </>
            ) : null}
          </>
        )}
      </Formik>
    </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

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
