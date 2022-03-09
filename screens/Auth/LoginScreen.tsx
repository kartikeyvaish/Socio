// Packages Imports
import { useContext } from "react";
import { Keyboard, StyleSheet, View } from "react-native";

// component imports
import AppForm from "../../components/AppForm";
import AppFormField from "../../components/AppFormField";
import AppFormPasswordField from "../../components/AppFormPasswordField";
import AppSubmitButton from "../../components/AppSubmitButton";
import AppText from "../../components/AppText";
import { AuthScreenProps } from "../../navigation/NavigationProps";
import ColorPallete from "../../constants/ColorPallete";
import env from "../../config/env";
import FontNames from "../../constants/FontNames";
import GlobalContext from "../../context/GlobalContext";
import Helper from "../../utils/Helper";
import JWT from "../../auth/JWT";
import LoginSchema from "../../schemas/LoginSchema";
import ScreenNames from "../../navigation/ScreenNames";
import ToastMessages from "../../constants/Messages";
import useLoading from "../../hooks/useLoading";
import useAuthEndpoints from "../../api/useAuthEndpoints";
import SecureStore from "../../auth/SecureStore";

// function component for LoginScreen
function LoginScreen(props: AuthScreenProps<"LoginScreen">) {
  // Destructuring props
  const { navigation } = props;

  // Get global context
  const { SetUser, PushToken } = useContext(GlobalContext);
  const { Loading, SetLoading } = useLoading();
  const { Login } = useAuthEndpoints();

  // function for Login API
  const LoginAPI = async (values: any) => {
    try {
      Keyboard.dismiss();

      let payload = { ...values, push_notification_token: PushToken };

      SetLoading(true);
      // API call
      const apiResponse = await Login(payload);

      SetLoading(false);
      if (apiResponse.ok && apiResponse !== null) {
        const decodedData: any = JWT.decodeToken(apiResponse.data.user_token);

        SecureStore.SetItem("access_token", decodedData.access_token);
        SecureStore.SetItem("refresh_token", decodedData.refresh_token);

        if (decodedData.access_token) delete decodedData.access_token;
        if (decodedData.refresh_token) delete decodedData.refresh_token;

        if (decodedData) SetUser(decodedData);
        else Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  // render
  return (
    <View style={styles.container}>
      <View style={{}}>
        <AppText text={env.application_name} family={FontNames.BerkshireSwash} size={50} />
        <AppText
          text={env.application_tag_line}
          marginTop={10}
          size={18}
          family={FontNames.PoppinsLight}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <AppForm
          initialValues={LoginSchema.InitialValues}
          validationSchema={LoginSchema.ValidationSchema}
          onSubmit={LoginAPI}
        >
          <AppFormField
            mode="flat"
            title="email"
            label="Email/Username"
            keyboardType="email-address"
          />
          <AppFormPasswordField mode="flat" title="password" label="Password" />
          <AppText
            text="Forgot Password?"
            size={13}
            onPress={() => navigation.navigate(ScreenNames.ForgotPasswordEmailResetScreen)}
            style={[styles.textPressButton, { color: ColorPallete.primary }]}
          />
          <AppSubmitButton title="Login" roundness={100} marginTop={20} loading={Loading} />
        </AppForm>
      </View>

      <View style={styles.registerButtonContainer}>
        <AppText text={`New to ${env.application_name}? `} size={20} />

        <AppText
          text="Sign Up"
          size={20}
          style={styles.textPressButton}
          onPress={() => navigation.replace(ScreenNames.SignUpScreen)}
        />
      </View>
    </View>
  );
}

// exports
export default LoginScreen;

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
    marginBottom: 10,
  },
});
