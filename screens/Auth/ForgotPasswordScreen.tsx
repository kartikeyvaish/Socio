// Packages Imports (from node_modules)
import { StyleSheet } from "react-native";

// Local Imports (components/types/utils)
import AppContainer from "../../components/App/AppContainer";
import AppText from "../../components/App/AppText";
import AppForm from "../../components/Forms/AppForm";
import AppFormTextField from "../../components/Forms/AppFormTextField";
import AppFormSubmitButton from "../../components/Forms/AppFormSubmitButton";
import AppView from "../../components/App/AppView";
import NewUserFormValidation from "../../validations/NewUserFormValidation";

// interface for ForgotPasswordScreen component
export interface ForgotPasswordScreenProps {}

// functional component for ForgotPasswordScreen
function ForgotPasswordScreen(props: ForgotPasswordScreenProps) {
  // Destructuring props
  const {} = props;

  const sendForgotPasswordOTP = async (values: typeof NewUserFormValidation.initialValues) => {
    try {
    } catch (error) {}
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
        />

        <AppView style={{ justifyContent: "flex-end" }}>
          <AppFormSubmitButton title='Send OTP' animatedViewProps={{ layout: undefined }} />
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
