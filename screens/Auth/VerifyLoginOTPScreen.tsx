// Packages Imports (from node_modules)
import { useState } from "react";
import { StyleSheet } from "react-native";

// Local Imports (components/types/utils)
import AnimatedOTPInput from "../../components/Inputs/OTPInput";
import AnimatedView from "../../components/Animated/AnimatedView";
import AppButton from "../../components/App/AppButton";
import AppContainer from "../../components/App/AppContainer";
import AppText from "../../components/App/AppText";
import BackButtonHeader from "../../components/Headers/BackButtonHeader";

// interface for VerifyLoginOTPScreen component
export interface VerifyLoginOTPScreenProps {}

// functional component for VerifyLoginOTPScreen
function VerifyLoginOTPScreen(props: VerifyLoginOTPScreenProps) {
  // Destructuring props
  const {} = props;

  const [otp, setOtp] = useState<string>("");

  const verifyOtp = async () => {
    try {
    } catch (error) {}
  };

  // render
  return (
    <AppContainer style={styles.container}>
      <BackButtonHeader title='Verify Email' />

      <AppText
        text='Please enter the OTP sent to your email address to continue.'
        style={{ textAlign: "center" }}
        margins={{ bottom: 20, top: 20 }}
      />

      <AnimatedView style={{ justifyContent: "center", flex: 1 }}>
        <AnimatedOTPInput onChange={setOtp} />
      </AnimatedView>

      <AppButton title='Verify' onPress={verifyOtp} />
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
