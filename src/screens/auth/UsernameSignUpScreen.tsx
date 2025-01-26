// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';

// Local Imports (components/types/utils)
import authApi from '../../api/auth';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import Flex from '../../components/Flex';
import Icon from '../../components/Icon';
import UsernameSignUpForm from '../../forms/UsernameSignUpForm';

// Named Imports
import { AuthScreenProps } from '../../navigation/types';
import { FormValues } from '../../forms/UsernameSignUpForm';
import { fontFamilies } from '../../constants/ui';

// interface for UsernameSignUpScreen component
export interface LoginScreenProps {}

// functional component for UsernameSignUpScreen
function UsernameSignUpScreen(props: AuthScreenProps<'UsernameSignUpScreen'>) {
  // Destructuring props
  const { navigation, route } = props;

  const { email, verified_id } = route.params || {};

  const onBackPress = () => navigation.goBack();

  const onSubmit = async (values: FormValues) => {
    try {
      const apiResponse = await authApi.verifyUsername(values);

      if (apiResponse.ok) {
        navigation.replace('UserBasicDetailsScreen', {
          email,
          verified_id,
          username: values.username
        });
      }

      return { ok: false, error: apiResponse.errorText };
    } catch (error) {
      return { ok: false, error: 'Failed to verify Username' };
    }
  };

  // render
  return (
    <Container style={styles.container} flex={1}>
      <Icon family="AntDesign" name="arrowleft" size={32} onPress={onBackPress} />

      <Flex gap={12} justify="center" align="center" margins={{ top: 16, bottom: 16 }}>
        <AppText
          text={'Create Username'}
          size={30}
          family={fontFamilies.Poppins.medium}
          style={{ textAlign: 'center' }}
        />

        <AppText text={'Choose a username for you'} size={14} style={{ textAlign: 'center' }} />
      </Flex>

      <UsernameSignUpForm onSubmit={onSubmit} />
    </Container>
  );
}

// exports
export default UsernameSignUpScreen;

// styles for UsernameSignUpScreen
const styles = StyleSheet.create({
  container: {
    padding: 16
  }
});
