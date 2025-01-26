// Packages Imports (from node_modules)
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FadeOut, ZoomIn } from 'react-native-reanimated';

// Local Imports (components/types/utils)
import authApi from '../../api/auth';
import AppText from '../../components/AppText';
import Button from '../../components/Button';
import Container from '../../components/Container';
import colorPallete from '../../constants/colorPallete';
import EmailSignUpForm from '../../forms/EmailSignUpForm';
import Flex from '../../components/Flex';
import Icon from '../../components/Icon';

// Named Imports
import { AuthScreenProps } from '../../navigation/types';
import { FormValues } from '../../forms/EmailSignUpForm';
import { fontFamilies } from '../../constants/ui';

// functional component for InitiateResetPasswordScreen
function InitiateResetPasswordScreen(props: AuthScreenProps<'InitiateResetPasswordScreen'>) {
  // Destructuring props
  const { navigation } = props;

  // Local States
  const [mailSent, setMailSent] = useState(false);

  const onSubmit = async (values: FormValues) => {
    try {
      const apiResponse = await authApi.initiateResetPassword(values);

      if (apiResponse.ok) {
        setMailSent(true);
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
      {mailSent ? (
        <Flex align="center" justify="center" flex={1} gap={16} entering={ZoomIn.delay(500)}>
          <Icon family="AntDesign" name="checkcircle" size={100} color={colorPallete.success} />
          <AppText
            text="Password Reset Email Sent. Please check your email."
            size={20}
            family={fontFamilies.Poppins.medium}
            style={{ textAlign: 'center' }}
            layout={undefined}
          />

          <Button
            label="Back to Login"
            onPress={() => navigation.popToTop()}
            style={{ marginTop: 16 }}
          />
        </Flex>
      ) : null}

      {!mailSent ? (
        <Flex flex={1} exiting={FadeOut.duration(500)}>
          <AppText
            text="Socio"
            family={fontFamilies.BerkshireSwash.regular}
            size={50}
            marginBottom={10}
            layout={undefined}
          />

          <AppText
            text="Enter your email address. If an account with that email is present, we will send you a OTP to verify."
            marginBottom={20}
            layout={undefined}
          />

          <EmailSignUpForm onSubmit={onSubmit} submitButtonLabel="Reset Password" />
        </Flex>
      ) : null}
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
