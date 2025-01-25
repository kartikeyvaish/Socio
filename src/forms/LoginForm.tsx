// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';

// Local Imports (components/types/utils)
import AnimatedView from '../components/AnimatedView';
import Button from '../components/Button';
import Flex from '../components/Flex';
import Input from '../components/Input';
import LinkButton from '../components/LinkButton';

// Named Imports
import { themeSlice } from '../store/feature/themeSlice';
import { useAppDispatch } from '../store/storeHooks';

// interface for LoginForm component
export interface LoginFormProps {}

// functional component for LoginForm
function LoginForm(props: LoginFormProps) {
  // Destructuring props
  const {} = props;

  const dispatch = useAppDispatch();

  // render
  return (
    <AnimatedView style={styles.container}>
      <Flex gap={12}>
        <Input
          placeholder="Email or Username"
          appIconProps={{ family: 'FontAwesome', name: 'user-circle-o', size: 21 }}
        />

        <Input
          placeholder="Password"
          secureTextEntry
          appIconProps={{
            family: 'MaterialCommunityIcons',
            name: 'form-textbox-password',
            size: 21
          }}
        />
      </Flex>

      <Flex row align="flex-end" justify="flex-end" margins={{ top: 19, bottom: 30 }}>
        <LinkButton label="Forgot Password?" />
      </Flex>

      <Button label="Log In" onPress={() => dispatch(themeSlice.actions.toggleTheme())} />
    </AnimatedView>
  );
}

// exports
export default LoginForm;

// styles for LoginForm
const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});
