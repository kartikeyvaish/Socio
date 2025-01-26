// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';

// Local Imports (components/types/utils)
import AppText from '../../components/AppText';
import authApi from '../../api/auth';
import Container from '../../components/Container';
import Flex from '../../components/Flex';
import LinkButton from '../../components/LinkButton';
import LoginForm from '../../forms/LoginForm';

// Named Imports
import { AuthScreenProps } from '../../navigation/types';
import { FormValues } from '../../forms/LoginForm';
import { fontFamilies } from '../../constants/ui';

// interface for LoginScreen component
export interface LoginScreenProps {}

// functional component for LoginScreen
function LoginScreen(props: AuthScreenProps<'LoginScreen'>) {
  // Destructuring props
  const { navigation } = props;

  const onLoginFormSubmit = async (values: FormValues) => {
    try {
      const apiResponse = await authApi.login(values);

      if (apiResponse.ok && apiResponse.data) {
        navigation.navigate('VerifyOTPScreen', {
          resource: values.email,
          otp_id: apiResponse.data.otp_id,
          verifyMode: 'login',
          subtitle: 'A code has been sent to your email',
          title: 'Verify OTP'
        });
      } else {
        return { ok: false, error: apiResponse.errorText };
      }
    } catch (error) {
      return { ok: false, error: 'Failed to Login' };
    }
  };

  // render
  return (
    <Container style={styles.container} flex={1}>
      <AppText
        text="Socio"
        family={fontFamilies.BerkshireSwash.regular}
        size={50}
        marginBottom={40}
      />

      <LoginForm onSubmit={onLoginFormSubmit} />

      <Flex row gap={8} flex={1} align="flex-end" justify="center" layout={undefined}>
        <AppText text="Don't Have an Account?" layout={undefined} />
        <LinkButton label="Sign Up" onPress={() => navigation.navigate('EmailSignUpScreen')} />
      </Flex>
    </Container>
  );
}

// exports
export default LoginScreen;

// styles for LoginScreen
const styles = StyleSheet.create({
  container: {
    padding: 16
  }
});
