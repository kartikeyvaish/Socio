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
  first_name: string;
  last_name: string;
}

// interface for UserBasicDetailsForm component
export interface UserBasicDetailsFormProps extends FormSubmitProps<FormValues> {}

const UserBasicDetailsSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string()
});

// functional component for UserBasicDetailsForm
function UserBasicDetailsForm(props: UserBasicDetailsFormProps) {
  // Destructuring props
  const { onSubmit } = props;

  // render
  return (
    <AnimatedView style={styles.container}>
      <Form<FormValues>
        initialValues={{ first_name: '', last_name: '' }}
        onSubmit={onSubmit}
        validationSchema={UserBasicDetailsSchema}
      >
        <Flex gap={12}>
          <FormTextInputField placeholder="First Name" fieldName="first_name" />
          <FormTextInputField placeholder="Last Name" fieldName="last_name" />

          <FormError />

          <FormSubmitButton label="Proceed" />
        </Flex>
      </Form>
    </AnimatedView>
  );
}

// exports
export default UserBasicDetailsForm;

// styles for UserBasicDetailsForm
const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});
