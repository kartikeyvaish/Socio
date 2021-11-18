import React, { useState, useMemo } from "react";
import { View, StyleSheet, Dimensions, Keyboard } from "react-native";
import { connect } from "react-redux";
import { Formik } from "formik";

import API from "../api/API";
import Button from "./../components/Button";
import config from "../config/config";
import HyperLinkText from "./../components/HyperLinkText";
import KeyboardView from "../components/KeyboardView";
import { Login } from "./../store/auth/actions";
import LoginSchema from "../schema/LoginSchema";
import Text from "./../components/Text";
import TextInput from "./../components/TextInput";
import Toast from "../components/Toast";
import ScrollContainer from "./../components/ScrollContainer";

const ScreenWidth = Dimensions.get("screen").width;

const InitialValues = LoginSchema.InitialValues;
const ValidationSchema = LoginSchema.LoginScehma();

function LoginScreen({ navigation, PushToken, SetUser }) {
  const [Loading, SetLoading] = useState(false);

  const Login = async (values) => {
    try {
      Keyboard.dismiss();

      SetLoading(true);

      const response = await API.Login({
        Email: values.Email,
        Password: values.Password,
        PushToken: PushToken,
      });

      SetLoading(false);

      if (response.ok) SetUser(response.data.User);
      else Toast.show({ text: response.data || response.problem });
    } catch (error) {
      Toast.show({ text: config.messages.ServerError });
      SetLoading(false);
    }
  };

  // useMemo for Header titles
  const HeaderTitle = useMemo(
    () => (
      <>
        <Text
          text={config.appName}
          family="BerkshireSwash"
          size={50}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          marginTop={10}
        />

        <Text text="Login to continue" size={18} marginTop={10} />
      </>
    ),
    [navigation]
  );

  const FormikBody = () => (
    <Formik
      initialValues={InitialValues}
      onSubmit={(values) => Login(values)}
      validationSchema={ValidationSchema}
    >
      {({ handleChange, setFieldTouched, handleSubmit, errors, touched }) => (
        <>
          <TextInput
            label="Email/Username"
            mode="flat"
            keyboardType="email-address"
            onChangeText={handleChange("Email")}
            error={errors.Email}
            onBlur={() => setFieldTouched("Email")}
            errorVisibilty={touched.Email === true ? true : false}
            helperPadding="normal"
          />

          <TextInput
            label="Password"
            mode="flat"
            secureTextEntry={true}
            onChangeText={handleChange("Password")}
            error={errors.Password}
            onBlur={() => setFieldTouched("Password")}
            errorVisibilty={touched.Password === true ? true : false}
            helperPadding="normal"
          />

          <View style={{ width: "100%", alignItems: "flex-end" }}>
            <HyperLinkText
              Title="Forgot Password?"
              family="InterLight"
              onPress={() => navigation.navigate("ForgotPassword")}
            />
          </View>

          <Button
            title="Log in"
            marginTop={20}
            width="50%"
            style={{ alignSelf: "center" }}
            loading={Loading}
            onPress={handleSubmit}
          />
        </>
      )}
    </Formik>
  );

  return (
    <KeyboardView style={styles.container}>
      <ScrollContainer>
        {HeaderTitle}

        <View style={styles.Body}>{FormikBody()}</View>

        <View style={styles.Footer}>
          <View style={{ flexDirection: "row" }}>
            <Text
              text="Don't have an account?"
              numberOfLines={1}
              marginRight={10}
              size={20}
            />
            <HyperLinkText
              Title="Register"
              size={20}
              family="InterBold"
              onPress={() => navigation.replace("EmailSignUp")}
            />
          </View>
        </View>
      </ScrollContainer>
    </KeyboardView>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    width: ScreenWidth,
  },
  Body: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  Footer: {
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 20,
  },
});
