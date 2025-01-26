// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';

// Local Imports (components/types/utils)
import authApi from '../../api/auth';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import EmailSignUpForm from '../../forms/EmailSignUpForm';

// Named Imports
import { AuthScreenProps } from '../../navigation/types';
import { FormValues } from '../../forms/EmailSignUpForm';
import { fontFamilies } from '../../constants/ui';

// functional component for InitiateResetPasswordScreen
function InitiateResetPasswordScreen(props: AuthScreenProps<'InitiateResetPasswordScreen'>) {
  // Destructuring props
  const { navigation } = props;

  const onSubmit = async (values: FormValues) => {
    try {
      const apiResponse = await authApi.initiateResetPassword(values);

      if (apiResponse.ok) {
      } else {
        return { ok: false, error: apiResponse.errorText };
      }
    } catch (error) {
      return { ok: false, error: 'Failed to verify email address' };
    }
  };

  // render
  return (
    <Container style={styles.container} flex={1}>
      <AppText
        text="Socio"
        family={fontFamilies.BerkshireSwash.regular}
        size={50}
        marginBottom={10}
      />

      <AppText
        text="Enter your email address. If an account with that email is present, we will send you a OTP to verify."
        marginBottom={20}
      />

      <EmailSignUpForm onSubmit={onSubmit} />
    </Container>
  );
}

// exports
export default InitiateResetPasswordScreen;

// styles for InitiateResetPasswordScreen
const styles = StyleSheet.create({
  container: {
    padding: 16
  }
});
