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
import LinkButton from '../components/LinkButton';

// Named Imports
import { AppFormValues } from '../types/global';

export interface FormValues extends AppFormValues {
  email: string;
  password: string;
}

// interface for LoginForm component
export interface LoginFormProps extends FormSubmitProps<FormValues> {
  disabled?: boolean;
  showForgotPassword?: boolean;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
});

// functional component for LoginForm
function LoginForm(props: LoginFormProps) {
  // Destructuring props
  const { onSubmit, disabled, showForgotPassword = true } = props;

  // render
  return (
    <AnimatedView style={styles.container}>
      <Form<FormValues>
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={LoginSchema}
      >
        <Flex gap={12}>
          <FormTextInputField
            placeholder="Email"
            appIconProps={{ family: 'FontAwesome', name: 'user-circle-o', size: 21 }}
            disabled={disabled}
            fieldName="email"
          />

          <FormTextInputField
            placeholder="Password"
            secureTextEntry
            appIconProps={{
              family: 'MaterialCommunityIcons',
              name: 'form-textbox-password',
              size: 21
            }}
            disabled={disabled}
            fieldName="password"
          />

          <FormError />

          {showForgotPassword ? (
            <Flex
              row
              align="flex-end"
              justify="flex-end"
              margins={{ top: 5, bottom: 5 }}
              layout={undefined}
            >
              <LinkButton label="Forgot Password?" />
            </Flex>
          ) : null}

          <FormSubmitButton label="Log In" />
        </Flex>
      </Form>
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
