// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';

// Local Imports (components/types/utils)
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import Flex from '../../components/Flex';
import Icon from '../../components/Icon';
import UserBasicDetailsForm from '../../forms/UserBasicDetailsForm';

// Named Imports
import { AuthScreenProps } from '../../navigation/types';
import { FormValues } from '../../forms/UserBasicDetailsForm';
import { fontFamilies } from '../../constants/ui';

// functional component for UserBasicDetailsScreen
function UserBasicDetailsScreen(props: AuthScreenProps<'UserBasicDetailsScreen'>) {
  // Destructuring props
  const { navigation, route } = props;

  const { email, verified_id, username } = route.params || {};

  const onBackPress = () => navigation.goBack();

  const onSubmit = async (values: FormValues) => {
    try {
      navigation.replace('SignUpScreen', {
        email,
        verified_id,
        username,
        first_name: values.first_name,
        last_name: values.last_name
      });

      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Failed to proceed' };
    }
  };

  // render
  return (
    <Container style={styles.container} flex={1}>
      <Icon family="AntDesign" name="arrowleft" size={32} onPress={onBackPress} />

      <Flex gap={12} justify="center" align="center" margins={{ top: 16, bottom: 16 }}>
        <AppText
          text={'About You'}
          size={30}
          family={fontFamilies.Poppins.medium}
          style={{ textAlign: 'center' }}
        />

        <AppText text={'Please enter your name'} size={14} style={{ textAlign: 'center' }} />
      </Flex>

      <UserBasicDetailsForm onSubmit={onSubmit} />
    </Container>
  );
}

// exports
export default UserBasicDetailsScreen;

// styles for UserBasicDetailsScreen
const styles = StyleSheet.create({
  container: {
    padding: 16
  }
});
