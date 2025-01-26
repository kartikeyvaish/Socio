// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

// Local Imports (components/types/utils)
import AnimatedView from '../components/AnimatedView';
import Form, { FormSubmitProps } from '../components/Form';
import FormError from '../components/FormError';
import FormSubmitButton from '../components/FormSubmitButton';
import FormTextInputField from '../components/FormTextInputField';
import Flex from '../components/Flex';

// Named Imports
import { AppFormValues } from '../types/global';

export interface FormValues extends AppFormValues {
  username: string;
}

// interface for UsernameSignUpForm component
export interface UsernameSignUpFormProps extends FormSubmitProps<FormValues> {}

const UsernameSignUpSchema = Yup.object().shape({
  username: Yup.string().required('Username is required')
});

// functional component for UsernameSignUpForm
function UsernameSignUpForm(props: UsernameSignUpFormProps) {
  // Destructuring props
  const { onSubmit } = props;

  // render
  return (
    <AnimatedView style={styles.container}>
      <Form<FormValues>
        initialValues={{ username: '' }}
        onSubmit={onSubmit}
        validationSchema={UsernameSignUpSchema}
      >
        <Flex gap={12}>
          <FormTextInputField placeholder="Username" fieldName="username" />

          <FormError />

          <FormSubmitButton label="Proceed" />
        </Flex>
      </Form>
    </AnimatedView>
  );
}

// exports
export default UsernameSignUpForm;

// styles for UsernameSignUpForm
const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});
