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
  email: string;
}

// interface for EmailSignUpForm component
export interface EmailSignUpFormProps extends FormSubmitProps<FormValues> {
  submitButtonLabel?: string;
}

const EmailSignUpSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email address').required('Email is required')
});

// functional component for EmailSignUpForm
function EmailSignUpForm(props: EmailSignUpFormProps) {
  // Destructuring props
  const { onSubmit, submitButtonLabel = 'Create Account' } = props;

  // render
  return (
    <AnimatedView style={styles.container}>
      <Form<FormValues>
        initialValues={{ email: '' }}
        onSubmit={onSubmit}
        validationSchema={EmailSignUpSchema}
      >
        <Flex gap={12}>
          <FormTextInputField placeholder="Email" fieldName="email" keyboardType="email-address" />

          <FormError />

          <FormSubmitButton label={submitButtonLabel} />
        </Flex>
      </Form>
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
