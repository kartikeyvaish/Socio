// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';

// Local Imports (components/types/utils)
import authApi from '../../api/auth';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import EmailSignUpForm from '../../forms/EmailSignUpForm';
import Flex from '../../components/Flex';
import LinkButton from '../../components/LinkButton';

// Named Imports
import { AuthScreenProps } from '../../navigation/types';
import { FormValues } from '../../forms/EmailSignUpForm';
import { fontFamilies } from '../../constants/ui';

// interface for EmailSignUpScreen component
export interface LoginScreenProps {}

// functional component for EmailSignUpScreen
function EmailSignUpScreen(props: AuthScreenProps<'EmailSignUpScreen'>) {
  // Destructuring props
  const { navigation } = props;

  const onSubmit = async (values: FormValues) => {
    try {
      const apiResponse = await authApi.emailSignUp(values);

      if (apiResponse.ok) {
        navigation.replace('VerifyOTPScreen', {
          resource: values.email,
          otp_id: apiResponse.data.otp_id,
          verifyMode: 'verify_email_signup',
          subtitle: 'A code has been sent to your email',
          title: 'Verify OTP'
        });
      } else {
        return { ok: false, error: apiResponse.errorText };
      }
    } catch (error) {
      return { ok: false, error: 'Failed to SignUp' };
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

      <AppText text="Enter your email address to sign up." marginBottom={20} />

      <EmailSignUpForm onSubmit={onSubmit} />

      <Flex row gap={8} flex={1} align="flex-end" justify="center" layout={undefined}>
        <AppText text="Already an Account?" layout={undefined} />
        <LinkButton label="Log In" onPress={() => navigation.popToTop()} />
      </Flex>
    </Container>
  );
}

// exports
export default EmailSignUpScreen;

// styles for EmailSignUpScreen
const styles = StyleSheet.create({
  container: {
    padding: 16
  }
});
