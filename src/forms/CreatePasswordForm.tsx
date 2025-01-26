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
  password: string;
  confirm_password: string;
}

// interface for CreatePasswordForm component
export interface CreatePasswordFormProps extends FormSubmitProps<FormValues> {}

const PasswordCreateSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

// functional component for CreatePasswordForm
function CreatePasswordForm(props: CreatePasswordFormProps) {
  // Destructuring props
  const { onSubmit } = props;

  // render
  return (
    <AnimatedView style={styles.container}>
      <Form<FormValues>
        initialValues={{ password: '', confirm_password: '' }}
        onSubmit={onSubmit}
        validationSchema={PasswordCreateSchema}
      >
        <Flex gap={12}>
          <FormTextInputField placeholder="Password" secureTextEntry fieldName="password" />

          <FormTextInputField
            placeholder="Confirm Password"
            secureTextEntry
            fieldName="confirm_password"
          />

          <FormError />

          <FormSubmitButton label="Create Account" />
        </Flex>
      </Form>
    </AnimatedView>
  );
}

// exports
export default CreatePasswordForm;

// styles for CreatePasswordForm
const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});
