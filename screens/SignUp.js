import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as DocumentPicker from "expo-document-picker";

import API from "../api/API";
import Button from "../components/Button";
import config from "../config/config";
import ColorPallete from "../config/ColorPallete";
import HyperLinkText from "../components/HyperLinkText";
import Icon from "../components/Icon";
import KeyboardView from "../components/KeyboardView";
import { Login } from "./../store/auth/actions";
import RegisterSchema from "../schema/RegisterSchema";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import Toast from "../components/Toast";

const defaultPic = config.default_profile_picture;
const ScreenWidth = Dimensions.get("screen").width;

const InitialValues = RegisterSchema.InitialValues;
const ValidationSchema = RegisterSchema.RegisterSchema();

function SignUp({ navigation, route, PushToken, SetUser }) {
  const [Loading, SetLoading] = useState(false);
  const [ProfileImage, SetProfileImage] = useState(defaultPic);

  const Register = async (values) => {
    try {
      SetLoading(true);
      const formData = new FormData();

      formData.append("Name", values.Name);
      formData.append("Email", route?.params?.Email || "");
      formData.append("Username", values.Username);
      formData.append("Password", values.Password);
      formData.append("PushToken", PushToken);

      if (ProfileImage !== defaultPic) {
        formData.append("ProfilePicture", {
          type: "image/jpeg",
          name: "ProfilePicture.jpg",
          uri: ProfileImage,
        });
      }

      const response = await API.Register(formData);
      SetLoading(false);

      if (response.ok) await SetUser(response.data.User);
      else Toast.show({ text: response.data });
    } catch (error) {
      Toast.show({ text: config.messages.ServerError });
      SetLoading(false);
    }
  };

  const ChangeImage = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync();

      if (response.type === "success")
        SetProfileImage("file://" + response.uri);
    } catch (error) {}
  };

  return (
    <KeyboardView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          text="Register to continue"
          size={22}
          containerStyle={{ padding: 15 }}
        />

        <Formik
          initialValues={InitialValues}
          onSubmit={(values) => Register(values)}
          validationSchema={ValidationSchema}
        >
          {({
            handleChange,
            setFieldTouched,
            handleSubmit,
            errors,
            touched,
          }) => (
            <>
              <View style={{ justifyContent: "center" }}>
                <View style={styles.ImageBox}>
                  <View>
                    <Image
                      source={{ uri: ProfileImage }}
                      style={styles.Image}
                    />
                    {ProfileImage !== defaultPic ? (
                      <Pressable
                        style={styles.RemoveBTN}
                        onPress={() => SetProfileImage(defaultPic)}
                      >
                        <Icon
                          Name="Entypo"
                          IconName="circle-with-cross"
                          color={ColorPallete.primary}
                          size={22}
                        />
                      </Pressable>
                    ) : null}
                  </View>
                  <HyperLinkText
                    Title="Select A Profile Image"
                    size={18}
                    family="InterBold"
                    onPress={ChangeImage}
                  />
                </View>
              </View>

              <TextInput
                label="Name"
                mode="flat"
                onChangeText={handleChange("Name")}
                error={errors.Name}
                onBlur={() => setFieldTouched("Name")}
                errorVisibilty={touched.Name === true ? true : false}
                helperPadding="normal"
              />

              <TextInput
                label="Username"
                mode="flat"
                onChangeText={handleChange("Username")}
                error={errors.Username}
                onBlur={() => setFieldTouched("Username")}
                errorVisibilty={touched.Username === true ? true : false}
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

              <TextInput
                label="Confirm Password"
                mode="flat"
                secureTextEntry={true}
                onChangeText={handleChange("ConfirmPassword")}
                error={errors.ConfirmPassword}
                onBlur={() => setFieldTouched("ConfirmPassword")}
                errorVisibilty={touched.ConfirmPassword === true ? true : false}
                helperPadding="normal"
              />

              <Button
                title="Register"
                marginTop={20}
                width="50%"
                style={{ alignSelf: "center" }}
                loading={Loading}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>

        <View style={styles.RemainingBox}>
          <View style={{ flexDirection: "row" }}>
            <Text
              text="Already have an account?"
              numberOfLines={1}
              marginRight={10}
              size={20}
            />
            <HyperLinkText
              Title="Login"
              size={20}
              family="InterBold"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
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
