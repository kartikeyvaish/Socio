// Packages Imports (from node_modules)
import { useState } from "react";
import { StyleSheet } from "react-native";

// Local Imports (components/types/utils)
import AppContainer from "../../components/App/AppContainer";
import AppText from "../../components/App/AppText";
import AppForm from "../../components/Forms/AppForm";
import AppFormTextField from "../../components/Forms/AppFormTextField";
import AppFormSubmitButton from "../../components/Forms/AppFormSubmitButton";
import AppView from "../../components/App/AppView";
import Messages from "../../constants/Messages";
import NewUserFormValidation from "../../validations/NewUserFormValidation";

// named imports
import { forgotPasswordAPI } from "../../api/services/Auth";
import { AuthScreenProps } from "../../navigation/NavigationTypes";

// functional component for ForgotPasswordScreen
function ForgotPasswordScreen(props: AuthScreenProps<"ForgotPasswordScreen">) {
  // Destructuring props
  const { navigation } = props;

  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendForgotPasswordOTP = async (values: typeof NewUserFormValidation.initialValues) => {
    try {
      setFormError(null);
      setLoading(true);
      const apiResponse = await forgotPasswordAPI(values);
      setLoading(false);

      if (apiResponse.ok === true) {
        navigation.replace("VerifyForgotPasswordOTPScreen", {
          ...values,
          otp_id: apiResponse.data.otp_id.toString(),
        });
      } else if (apiResponse.ok === false) {
        setFormError(apiResponse.data.errors.base);
      }
    } catch (error) {
      setLoading(false);
      setFormError(Messages.serverErrorMessage);
    }
  };

  // render
  return (
    <AppContainer style={styles.container}>
      <AppText
        text='Enter your registered email address. We will send an OTP to your email through which we will verify your account.'
        margins={{ top: 20, bottom: 20 }}
        size={16}
        style={{ textAlign: "center" }}
      />

      <AppForm
        initialValues={NewUserFormValidation.initialValues}
        validationSchema={NewUserFormValidation.validationSchema}
        onSubmit={sendForgotPasswordOTP}
      >
        <AppFormTextField
          title='email'
          placeholder='Email'
          autoFocus={true}
          keyboardType='email-address'
          customError={formError}
        />

        <AppView style={{ justifyContent: "flex-end" }} layout={undefined}>
          <AppFormSubmitButton
            title='Send OTP'
            animatedViewProps={{ layout: undefined }}
            loading={loading}
          />
        </AppView>
      </AppForm>
    </AppContainer>
  );
}

// exports
export default ForgotPasswordScreen;

// styles for ForgotPasswordScreen
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
  },
});
