// Packages Imports (from node_modules)
import { useState } from "react";
import { StyleSheet } from "react-native";

// Local Imports (components/types/utils)
import AnimatedOTPInput from "../../components/Inputs/OTPInput";
import AnimatedView from "../../components/Animated/AnimatedView";
import AppButton from "../../components/App/AppButton";
import AppContainer from "../../components/App/AppContainer";
import AppText from "../../components/App/AppText";
import authActions from "../../store/auth/actions";
import ErrorText from "../../components/Text/ErrorText";
import JWT from "../../helpers/jwt";
import Messages from "../../constants/Messages";

// Named Imports
import { AuthScreenProps } from "../../navigation/NavigationTypes";
import { setAccessToken, setRefreshToken } from "../../store/tokenStorage";
import { showToast } from "../../helpers/toastHelpers";
import { useAppDispatch } from "../../store/reduxHooks";
import { UserProps } from "../../types/AppTypes";
import { verifyLoginOtpAPI } from "../../api/services/Auth";

// interface for VerifyLoginOTPScreen component
export interface VerifyLoginOTPScreenProps {}

// functional component for VerifyLoginOTPScreen
function VerifyLoginOTPScreen(props: AuthScreenProps<"VerifyLoginOTPScreen">) {
  // Destructuring props
  const { route } = props;
  const { params } = route;

  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");

  const dispatch = useAppDispatch();

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const apiResponse = await verifyLoginOtpAPI({ ...params, otp });
      setLoading(false);

      if (apiResponse.ok === true) {
        const payload = JWT.decodeToken<UserProps>(apiResponse.data.access_token);

        if (payload === null) {
          setFormError(Messages.serverErrorMessage);
          return;
        }

        showToast({ preset: "done", title: apiResponse.data.message });
        setAccessToken(apiResponse.data.access_token);
        setRefreshToken(apiResponse.data.refresh_token);
        dispatch(authActions.setUser(payload));
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

      <AppButton title='Verify' onPress={verifyOtp} disabled={loading} />
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
