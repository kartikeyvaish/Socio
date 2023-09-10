// Packages Imports (from node_modules)
import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";

// Local Imports (components/types/utils)
import AnimatedView from "../../components/Animated/AnimatedView";
import AppContainer from "../../components/App/AppContainer";
import AppForm from "../../components/Forms/AppForm";
import AppFormPasswordField from "../../components/Forms/AppFormPasswordField";
import AppFormSubmitButton from "../../components/Forms/AppFormSubmitButton";
import RegisterFormValidation from "../../validations/RegisterFormValidation";

// interface for ResetPasswordScreen component
export interface ResetPasswordScreenProps {}

// functional component for ResetPasswordScreen
function ResetPasswordScreen(props: ResetPasswordScreenProps) {
  // Destructuring props
  const {} = props;

  // Local States
  const [usernameError, setUsernameError] = useState<string>("");

  const resetPassword = async (values: typeof RegisterFormValidation.initialValues) => {
    try {
    } catch (error) {}
  };

  // render
  return (
    <AppContainer style={styles.container}>
      <ScrollView>
        <AppForm
          initialValues={RegisterFormValidation.initialValues}
          validationSchema={RegisterFormValidation.validationSchema}
          onSubmit={resetPassword}
        >
          <AnimatedView style={styles.formComponent}>
            <AppFormPasswordField
              placeholder='New Password'
              title='password'
              containerStyles={{ marginBottom: 15 }}
            />

            <AppFormPasswordField
              placeholder='Confirm New Password'
              title='confirm_password'
              containerStyles={{ marginBottom: 15 }}
            />

            <AppFormSubmitButton title='Reset Password' margins={{ top: 20 }} />
          </AnimatedView>
        </AppForm>
      </ScrollView>
    </AppContainer>
  );
}

// exports
export default ResetPasswordScreen;

// styles for ResetPasswordScreen
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
  },
  formComponent: {
    marginTop: 25,
  },
});
