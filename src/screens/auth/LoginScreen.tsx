// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';

// Local Imports (components/types/utils)
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import Flex from '../../components/Flex';
import LinkButton from '../../components/LinkButton';
import LoginForm from '../../forms/LoginForm';

// Named Imports
import { AuthScreenProps } from '../../navigation/types';
import { fontFamilies } from '../../constants/ui';

// interface for LoginScreen component
export interface LoginScreenProps {}

// functional component for LoginScreen
function LoginScreen(props: AuthScreenProps<'LoginScreen'>) {
  // Destructuring props
  const {} = props;

  // render
  return (
    <Container style={styles.container} flex={1}>
      <AppText
        text="Socio"
        family={fontFamilies.BerkshireSwash.regular}
        size={50}
        marginBottom={40}
      />

      <LoginForm />

      <Flex row gap={8} flex={1} align="flex-end" justify="center">
        <AppText text="Don't Have an Account?" layout={undefined} />
        <LinkButton label="Sign Up" />
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
