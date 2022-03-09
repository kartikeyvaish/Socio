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
import FontNames from "../../constants/FontNames";
import IconNames from "../../constants/IconNames";
import OTPSchema from "../../schemas/OTPSchema";
import ScreenNames from "../../navigation/ScreenNames";
import Helper from "../../utils/Helper";
import ToastMessages from "../../constants/Messages";
import useAuthEndpoints from "../../api/useAuthEndpoints";
import useLoading from "../../hooks/useLoading";

// function component for EmailOTPSignUpVerifyScreen
function EmailOTPSignUpVerifyScreen(props: AuthScreenProps<"EmailOTPSignUpVerifyScreen">) {
  // Destructuring props
  const { navigation, route } = props;

  // Custom Hooks
  const { Loading, SetLoading } = useLoading();
  const { VerifyEmailSignUpOTP } = useAuthEndpoints();

  // API call to verify OTP
  const VerifyOTP = async (values: any) => {
    try {
      Keyboard.dismiss();

      SetLoading(true);
      const apiResponse = await VerifyEmailSignUpOTP({
        otp_id: route.params.otp_id,
        otp: values.otp,
      });
      SetLoading(false);

      if (apiResponse.ok && apiResponse !== null) {
        navigation.replace(ScreenNames.SignUpScreen, {
          email: route.params?.email ?? "",
        });
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
      <AppText
        text={`Enter 6 digit OTP send to ${route.params?.email ?? "your email"}`}
        marginTop={10}
        size={18}
        family={FontNames.PoppinsLight}
      />

      <AppView style={{ marginTop: 20 }}>
        <AppForm
          initialValues={OTPSchema.InitialValues}
          validationSchema={OTPSchema.ValidationSchema}
          onSubmit={VerifyOTP}
        >
          <AppFormField
            mode="flat"
            title="otp"
            label="Confirmation Code"
            maxLength={6}
            keyboardType="number-pad"
          />

          <View style={{ flex: 1, alignItems: "center" }}>
            <AppSubmitButton
              roundness={100}
              loading={Loading}
              CustomButton={props => (
                <AppIconButton
                  loading={Loading}
                  iconProps={{
                    family: IconNames.AntDesign,
                    name: "arrowright",
                  }}
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
export default EmailOTPSignUpVerifyScreen;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
