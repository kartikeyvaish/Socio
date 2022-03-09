// Packages Imports
import { useContext } from "react";
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

// component imports
import AppForm from "../../components/AppForm";
import AppFormField from "../../components/AppFormField";
import AppFormPasswordField from "../../components/AppFormPasswordField";
import AppSubmitButton from "../../components/AppSubmitButton";
import AppText from "../../components/AppText";
import { AuthScreenProps } from "../../navigation/NavigationProps";
import ChoosePicture from "../../components/AvatarSelect";
import ColorPallete from "../../constants/ColorPallete";
import { default_profile_picture } from "../../constants/ProfileConstants";
import FontNames from "../../constants/FontNames";
import GlobalContext from "../../context/GlobalContext";
import Helper from "../../utils/Helper";
import JWT from "../../auth/JWT";
import SecureStore from "../../auth/SecureStore";
import SignupSchema from "../../schemas/SignupSchema";
import ScreenNames from "../../navigation/ScreenNames";
import ToastMessages from "../../constants/Messages";
import useAuthEndpoints from "../../api/useAuthEndpoints";
import useDocumentPicker from "../../hooks/useDocumentPicker";
import useLoading from "../../hooks/useLoading";

// function component for SignUpScreen
function SignUpScreen(props: AuthScreenProps<"SignUpScreen">) {
  // Destructuring props
  const { navigation, route } = props;
  const { SignUp } = useAuthEndpoints();

  // Hooks and Contexts
  const { Loading, SetLoading } = useLoading();
  const { SetUser, PushToken } = useContext(GlobalContext);

  // fields from props
  const { email, name, profile_picture } = route.params ?? {};

  // construct initial values for sign up form
  const initialValues = {
    ...SignupSchema.InitialValues,
    ...(email ? { email } : {}),
    ...(name ? { name } : {}),
  };

  // default profile picture
  const defaultPicture = profile_picture ?? default_profile_picture;

  // useDocumentPicker hook
  const { selectedFile, unselectFile, PickDocument, sameAsInitial } = useDocumentPicker({
    defaultFile: defaultPicture,
  });

  // function for Login API
  const SignUpAPI = async (values: any) => {
    try {
      // close the Keyboard
      Keyboard.dismiss();

      // Prepare a formData object
      const formData = new FormData();

      // now append all the properties of the values object into the formData
      Object.keys(values).forEach(key => {
        if (key !== "profile_picture") formData.append(key, values[key]);
      });

      if (PushToken) formData.append("push_notification_token", PushToken);

      // If google image is present
      if (selectedFile.isRemoteImage) {
        formData.append("remote_profile_picture", selectedFile.uri);
      } else {
        if (selectedFile.uri !== defaultPicture.uri) {
          // If user has chosen a Profile selectedFile then append it to the formData
          let profile_picture: any = {
            uri: selectedFile.uri,
            type: selectedFile.mimeType ?? "image/jpeg",
            name: selectedFile.name ?? "profile_picture.jpeg",
          };

          formData.append("profile_picture", profile_picture);
        }
      }

      // Call the API
      SetLoading(true);
      const registerResponse = await SignUp(formData);
      SetLoading(false);

      // Check the respponse
      if (registerResponse.ok) {
        // const decodedData = JWT.decodeToken(registerResponse.data.user_token);
        // if (decodedData) SetUser(decodedData);
        // else Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);

        const decodedData: any = JWT.decodeToken(registerResponse.data.user_token);

        SecureStore.SetItem("access_token", decodedData.access_token);
        SecureStore.SetItem("refresh_token", decodedData.refresh_token);

        if (decodedData.access_token) delete decodedData.access_token;
        if (decodedData.refresh_token) delete decodedData.refresh_token;

        if (decodedData) SetUser(decodedData);
        else Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      } else Helper.ShowToast(registerResponse.data?.message);
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  // render
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={{}}>
          <AppText
            text="Register to Continue"
            marginTop={10}
            size={20}
            family={FontNames.InterBold}
          />
        </View>

        <ChoosePicture
          uri={selectedFile.uri}
          onPickPress={PickDocument}
          onRemovePress={unselectFile}
          showRemoveIcon={sameAsInitial}
        />

        <View style={{ marginTop: 5 }}>
          <AppForm
            initialValues={initialValues}
            validationSchema={SignupSchema.ValidationSchema}
            onSubmit={SignUpAPI}
          >
            <AppFormField
              mode="flat"
              title="name"
              label="Name"
              controlled={route.params?.name ? true : false}
              disabled={route.params?.name ? true : false}
            />
            <AppFormField
              title="email"
              label="Email"
              controlled={route.params?.email ? true : false}
              disabled={route.params?.email ? true : false}
            />
            <AppFormField
              mode="flat"
              title="username"
              label="Username"
              style={{ marginTop: -20 }}
            />
            <AppFormPasswordField mode="flat" title="password" label="Password" />
            <AppFormPasswordField mode="flat" title="confirm_password" label="Confirm Password" />
            <AppSubmitButton title="Sign Up" roundness={100} marginTop={20} loading={Loading} />
          </AppForm>
        </View>

        <View style={styles.registerButtonContainer}>
          <AppText text="Already A User? " size={20} />

          <AppText
            text="Login"
            size={20}
            style={styles.textPressButton}
            onPress={() => navigation.replace(ScreenNames.LoginScreen)}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

// Map State to Props
const mapStateToProps = (state: any) => {
  return {
    PushToken: state.AuthState.PushToken,
  };
};

// Connect and Export
export default connect(mapStateToProps)(SignUpScreen);

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  textPressButton: {
    marginTop: -15,
    textAlign: "right",
    textDecorationLine: "underline",
    color: ColorPallete.orange,
  },
  registerButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 20,
    marginTop: 20,
  },
});
