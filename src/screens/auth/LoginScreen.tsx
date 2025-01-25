// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';

// Local Imports (components/types/utils)
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import Flex from '../../components/Flex';
import LinkButton from '../../components/LinkButton';
import LoginForm from '../../forms/LoginForm';

// Named Imports
import { fontFamilies } from '../../constants/ui';

// interface for LoginScreen component
export interface LoginScreenProps {}

// functional component for LoginScreen
function LoginScreen(props: LoginScreenProps) {
  // Destructuring props
  const {} = props;

  // render
  return (
    <Container style={styles.container} flex={1} justify="center" align="center">
      <AppText
        text="Socio"
        family={fontFamilies.BerkshireSwash.regular}
        size={50}
        marginBottom={40}
      />

      <LoginForm />

      <Flex row gap={8} margins={{ top: 40 }}>
        <AppText text="Don't Have an Account?" />
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
