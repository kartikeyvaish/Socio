import React, { useState } from "react";
import { StyleSheet, ToastAndroid } from "react-native";
import { connect } from "react-redux";
import { Formik } from "formik";

import API from "../api/API";
import Button from "../components/Button";
import ChangePasswordSchema from "../schema/ChangePassword";
import Container from "../components/Container";
import TextInput from "../components/TextInput";

const InitialValues = ChangePasswordSchema.InitialValues;
const ValidationSchema = ChangePasswordSchema.ChangePasswordSchema();

function ChangePassword({ navigation, User }) {
  const [Loading, SetLoading] = useState(false);

  // Function to handle the submit of the form
  const ChangePasswordAPI = async (values) => {
    try {
      SetLoading(true);
      const response = await API.ChangePassword(values, User.Token);
      SetLoading(false);
      if (response.ok) {
        navigation.goBack();
        ToastAndroid.show(response.data, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(response.data, ToastAndroid.SHORT);
      }
    } catch (error) {}
  };

  return (
    <Container style={styles.container}>
      <Formik
        initialValues={InitialValues}
        onSubmit={ChangePasswordAPI}
        validationSchema={ValidationSchema}
      >
        {({ handleChange, setFieldTouched, handleSubmit, errors, touched }) => (
          <>
            <TextInput
              label="Current Password"
              mode="flat"
              secureTextEntry={true}
              onChangeText={handleChange("CurrentPassword")}
              error={errors.CurrentPassword}
              onBlur={() => setFieldTouched("CurrentPassword")}
              errorVisibilty={touched.CurrentPassword === true ? true : false}
              helperPadding="normal"
            />

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
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.User,
  };
};

export default connect(mapStateToProps)(ChangePassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
