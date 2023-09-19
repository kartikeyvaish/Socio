// Packages Imports (from node_modules)
import { useState } from "react";
import { StyleSheet } from "react-native";

// Local Imports (components/types/utils)
import AnimatedOTPInput from "../../components/Inputs/OTPInput";
import AnimatedView from "../../components/Animated/AnimatedView";
import AppButton from "../../components/App/AppButton";
import AppContainer from "../../components/App/AppContainer";
import AppText from "../../components/App/AppText";
import ErrorText from "../../components/Text/ErrorText";
import Messages from "../../constants/Messages";
import useLogin from "../../hooks/useLogin";

// Named Imports
import { AuthScreenProps } from "../../navigation/NavigationTypes";
import { verifyLoginOtpAPI } from "../../api/services/Auth";

// functional component for VerifyLoginOTPScreen
function VerifyLoginOTPScreen(props: AuthScreenProps<"VerifyLoginOTPScreen">) {
  // Destructuring props
  const { route } = props;
  const { params } = route;

  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");

  const { saveLoginDetails } = useLogin()

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const apiResponse = await verifyLoginOtpAPI({ ...params, otp });
      setLoading(false);

      if (apiResponse.ok === true) {
        saveLoginDetails(apiResponse.data)
      } else if (apiResponse.ok === false) {
        setFormError(apiResponse.data.errors.base);
      }
    } catch (error) {
      setFormError(Messages.serverErrorMessage);
      setLoading(false);
    }
  };

  // render
  return (
    <AppContainer style={styles.container}>
      <AppText
        text='Please enter the OTP sent to your email address to continue.'
        style={{ textAlign: "center" }}
        margins={{ bottom: 20, top: 20 }}
      />

      <ErrorText error={formError} style={{ textAlign: "center" }} size={15} />

      <AnimatedView style={{ justifyContent: "center", flex: 1 }}>
        <AnimatedOTPInput onChange={setOtp} />
      </AnimatedView>

      <AppButton
        title='Verify'
        onPress={verifyOtp}
        loading={loading}
        animatedViewProps={{ layout: undefined }}
      />
    </AppContainer>
  );
}

// exports
export default VerifyLoginOTPScreen;

// styles for VerifyLoginOTPScreen
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
  },
});
