// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';

// Local Imports (components/types/utils)
import AnimatedView from '../components/AnimatedView';
import Button from '../components/Button';
import Flex from '../components/Flex';
import Input from '../components/Input';

// Named Imports
import { variables } from '../constants/ui';

// interface for EmailSignUpForm component
export interface EmailSignUpFormProps {}

// functional component for EmailSignUpForm
function EmailSignUpForm(props: EmailSignUpFormProps) {
  // Destructuring props
  const {} = props;

  // render
  return (
    <AnimatedView style={styles.container}>
      <Flex gap={variables.gap.medium}>
        <Input placeholder="Email" keyboardType="email-address" />

        <Button label="Create Account" />
      </Flex>
    </AnimatedView>
  );
}

// exports
export default EmailSignUpForm;

// styles for EmailSignUpForm
const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});
