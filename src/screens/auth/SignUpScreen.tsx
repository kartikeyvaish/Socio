// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';

// Local Imports (components/types/utils)
import authApi from '../../api/auth';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import CreatePasswordForm from '../../forms/CreatePasswordForm';
import Flex from '../../components/Flex';
import Icon from '../../components/Icon';

// Named Imports
import { AuthScreenProps } from '../../navigation/types';
import { FormValues } from '../../forms/CreatePasswordForm';
import { fontFamilies } from '../../constants/ui';
import { getAuthPayload } from '../../helpers/auth';
import { authSlice } from '../../store/feature/authSlice';
import { useAppDispatch } from '../../store/storeHooks';

// functional component for SignUpScreen
function SignUpScreen(props: AuthScreenProps<'SignUpScreen'>) {
  // Destructuring props
  const { navigation, route } = props;

  const { email, verified_id, username, first_name, last_name } = route.params || {};

  const onBackPress = () => navigation.goBack();

  const dispatch = useAppDispatch();

  const onSubmit = async (values: FormValues) => {
    try {
      const apiResponse = await authApi.signUp({
        email,
        password: values.password,
        verified_id,
        username,
        first_name,
        last_name
      });

      if (apiResponse.ok) {
        let userData = getAuthPayload(apiResponse.data);

        if (userData) {
          dispatch(authSlice.actions.setUser({ user: userData }));

          return { ok: true };
        }

        return { error: 'Failed to Signup', ok: false };
      }

      return { error: apiResponse.errorText, ok: false };
    } catch (error) {
      return { ok: false, error: 'Failed to signup' };
    }
  };

  // render
  return (
    <Container style={styles.container} flex={1}>
      <Icon family="AntDesign" name="arrowleft" size={32} onPress={onBackPress} />

      <Flex gap={12} justify="center" align="center" margins={{ top: 16, bottom: 16 }}>
        <AppText
          text={'Create Password'}
          size={30}
          family={fontFamilies.Poppins.medium}
          style={{ textAlign: 'center' }}
        />

        <AppText text={'Almost Done!'} size={14} style={{ textAlign: 'center' }} />
      </Flex>

      <CreatePasswordForm onSubmit={onSubmit} />
    </Container>
  );
}

// exports
export default SignUpScreen;

// styles for SignUpScreen
const styles = StyleSheet.create({
  container: {
    padding: 16
  }
});
