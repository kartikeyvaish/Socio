// Packages Imports
import { StyleSheet, View, Keyboard } from "react-native";

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
import Helper from "../../utils/Helper";
import IconNames from "../../constants/IconNames";
import ScreenNames from "../../navigation/ScreenNames";
import ToastMessages from "../../constants/Messages";
import useAuthEndpoints from "../../api/useAuthEndpoints";
import useLoading from "../../hooks/useLoading";

// function component for EmailSignUpScreen
function EmailSignUpScreen(props: AuthScreenProps<"EmailSignUpScreen">) {
  // Destructuring props
  const { navigation } = props;

  // Local States
  const { Loading, SetLoading } = useLoading();
  const { SendEmailVerifyOTP } = useAuthEndpoints();

  // API call to send OTP to email
  const SendEmailVerifyOTPAPI = async (values: any) => {
    try {
      Keyboard.dismiss();

      SetLoading(true);

      const apiResponse = await SendEmailVerifyOTP({ email: values.email });

      SetLoading(false);

      if (apiResponse.ok && apiResponse !== null) {
        navigation.replace(ScreenNames.EmailOTPSignUpVerifyScreen, {
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
        text="Enter your email address to create an account"
        marginTop={10}
        size={18}
        family={FontNames.PoppinsLight}
      />

      <AppView style={{ marginTop: 20 }}>
        <AppForm
          initialValues={EmailSignUpSchema.InitialValues}
          validationSchema={EmailSignUpSchema.ValidationSchema}
          onSubmit={SendEmailVerifyOTPAPI}
        >
          <AppFormField mode="flat" title="email" label="Email" keyboardType="email-address" />

          <View style={{ flex: 1, alignItems: "center" }}>
            <AppSubmitButton
              roundness={100}
              loading={Loading}
              CustomButton={props => (
                <AppIconButton
                  iconProps={{
                    family: IconNames.AntDesign,
                    name: "arrowright",
                  }}
                  containerStyle={{ marginTop: 30 }}
                  loading={Loading}
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
export default EmailSignUpScreen;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
