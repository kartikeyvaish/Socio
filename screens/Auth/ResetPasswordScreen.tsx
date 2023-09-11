// Packages Imports (from node_modules)
import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";

// Local Imports (components/types/utils)
import AnimatedView from "../../components/Animated/AnimatedView";
import AppContainer from "../../components/App/AppContainer";
import AppForm from "../../components/Forms/AppForm";
import AppFormPasswordField from "../../components/Forms/AppFormPasswordField";
import AppFormSubmitButton from "../../components/Forms/AppFormSubmitButton";
import ResetPasswordValidations from "../../validations/ResetPasswordValidations";
import ErrorText from "../../components/Text/ErrorText";
import Messages from "../../constants/Messages";

// Named Imports
import { AuthScreenProps } from "../../navigation/NavigationTypes";
import { resetRequestAPI } from "../../api/services/Auth";
import { showToast } from "../../helpers/toastHelpers";

// interface for ResetPasswordScreen component
export interface ResetPasswordScreenProps {}

// functional component for ResetPasswordScreen
function ResetPasswordScreen(props: AuthScreenProps<"ResetPasswordScreen">) {
  // Destructuring props
  const { route, navigation } = props;
  const { reset_request_id } = route.params;

  // Local States
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const resetPassword = async (values: typeof ResetPasswordValidations.initialValues) => {
    try {
      setLoading(true);
      const apiResponse = await resetRequestAPI({
        password: values.password,
        reset_request_id,
      });
      setLoading(false);

      if (apiResponse.ok === true) {
        showToast({ preset: "done", title: apiResponse.data.message });
        navigation.popToTop();
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
      <ScrollView>
        <AppForm
          initialValues={ResetPasswordValidations.initialValues}
          validationSchema={ResetPasswordValidations.validationSchema}
          onSubmit={resetPassword}
        >
          <ErrorText error={formError} size={15} style={{ marginTop: 20, textAlign: "center" }} />

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

            <AppFormSubmitButton
              title='Reset Password'
              margins={{ top: 20 }}
              animatedViewProps={{ layout: undefined }}
              disabled={loading}
            />
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
