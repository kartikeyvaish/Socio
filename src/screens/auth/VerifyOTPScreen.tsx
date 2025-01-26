// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';

// Local Imports (components/types/utils)
import authApi from '../../api/auth';
import Container from '../../components/Container';
import VerifyOTPForm from '../../forms/VerifyOTPForm';

// Named Imports
import { AuthScreenProps } from '../../navigation/types';
import { authSlice } from '../../store/feature/authSlice';
import { FormValues } from '../../forms/VerifyOTPForm';
import { getAuthPayload } from '../../helpers/auth';
import { useAppDispatch } from '../../store/storeHooks';

// interface for VerifyOTPScreen component
export interface VerifyOTPScreenProps {
  title?: string;
  subtitle?: string;
}

// functional component for VerifyOTPScreen
function VerifyOTPScreen(props: AuthScreenProps<'VerifyOTPScreen'>) {
  // Destructuring props
  const { route, navigation } = props;

  const { subtitle, title, verifyMode, resource, otp_id } = route?.params || {};

  const goBack = () => navigation.goBack();

  const dispatch = useAppDispatch();

  const onFormSubmit = async (values: FormValues) => {
    try {
      if (!verifyMode || !otp_id || !resource) return { error: 'Failed to verify OTP', ok: false };

      switch (verifyMode) {
        case 'login': {
          return await verifyLoginOtp(values);
        }

        case 'verify_email_signup': {
          return await verifyEmailSignUpOtp(values);
        }

        default:
          break;
      }
    } catch (error) {}
  };

  const verifyLoginOtp = async (values: FormValues) => {
    try {
      const { otp } = values;

      const apiResponse = await authApi.verifyLoginOtp({ otp, otp_id, email: resource });

      if (apiResponse.ok) {
        let userData = getAuthPayload(apiResponse.data);

        if (userData) {
          dispatch(authSlice.actions.setUser({ user: userData }));

          return { ok: true };
        }

        return { error: 'Failed to verify OTP', ok: false };
      }

      return { error: apiResponse.errorText, ok: false };
    } catch (error) {
      return { error: 'Failed to verify OTP', ok: false };
    }
  };

  const verifyEmailSignUpOtp = async (values: FormValues) => {
    try {
      const { otp } = values;

      const apiResponse = await authApi.verifyEmailSignUpOtp({ otp, otp_id, email: resource });

      if (apiResponse.ok && apiResponse.data) {
        navigation.replace('UsernameSignUpScreen', {
          email: resource,
          verified_id: apiResponse.data.verified_id
        });

        return { ok: true };
      }

      return { error: apiResponse.errorText, ok: false };
    } catch (error) {
      return { error: 'Failed to verify OTP', ok: false };
    }
  };

  // render
  return (
    <Container style={styles.container}>
      <VerifyOTPForm
        onBackPress={goBack}
        subtitle={subtitle}
        title={title}
        onSubmit={onFormSubmit}
      />
    </Container>
  );
}

// exports
export default VerifyOTPScreen;

// styles for VerifyOTPScreen
const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%'
  }
});
