// Packages Imports
import { Keyboard, StyleSheet, View } from "react-native";

// component imports
import AppForm from "../../components/AppForm";
import AppFormField from "../../components/AppFormField";
import AppIconButton from "../../components/IconButton";
import AppSubmitButton from "../../components/AppSubmitButton";
import AppText from "../../components/AppText";
import AppView from "../../components/AppView";
import { AuthScreenProps } from "../../navigation/NavigationProps";
import EmailSignUpSchema from "../../schemas/EmailSignUpSchema";
import FontNames from "../../constants/FontNames";
import IconNames from "../../constants/IconNames";
import ScreenNames from "../../navigation/ScreenNames";
import useLoading from "../../hooks/useLoading";
import useAuthEndpoints from "../../api/useAuthEndpoints";
import Helper from "../../utils/Helper";
import ToastMessages from "../../constants/Messages";

// function component for ForgotPasswordEmailResetScreen
function ForgotPasswordEmailResetScreen(props: AuthScreenProps<"ForgotPasswordEmailResetScreen">) {
  // Destructuring props
  const { navigation } = props;

  // Local States
  const { Loading, SetLoading } = useLoading();
  const { SendResetPasswordOTP } = useAuthEndpoints();

  // function for Login API
  const SendResetPassOTP = async (values: any) => {
    try {
      Keyboard.dismiss();

      SetLoading(true);

      const apiResponse = await SendResetPasswordOTP({ email: values.email });

      SetLoading(false);

      if (apiResponse.ok && apiResponse !== null) {
        navigation.replace(ScreenNames.ForgotPasswordOTPVerifyScreen, {
          email: values.email,
          otp_id: apiResponse.data.otp_id,
        });
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      SetLoading(false);
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // render
  return (
    <View style={styles.container}>
      <AppText
        text="Enter your email address. We will send you a OTP to reset your password."
        marginTop={10}
        size={18}
        family={FontNames.PoppinsLight}
      />

      <AppView style={{ marginTop: 20 }}>
        <AppForm
          initialValues={EmailSignUpSchema.InitialValues}
          validationSchema={EmailSignUpSchema.ValidationSchema}
          onSubmit={SendResetPassOTP}
        >
          <AppFormField mode="flat" title="email" label="Email" keyboardType="email-address" />

          <View style={{ flex: 1, alignItems: "center" }}>
            <AppSubmitButton
              roundness={100}
              CustomButton={props => (
                <AppIconButton
                  iconProps={{
                    family: IconNames.AntDesign,
                    name: "arrowright",
                  }}
                  loading={Loading}
                  containerStyle={{ marginTop: 30 }}
                  {...props}
                />
              )}
            />
          </View>
        </AppForm>
      </AppView>
    </View>
  );
}

// exports
export default ForgotPasswordEmailResetScreen;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
