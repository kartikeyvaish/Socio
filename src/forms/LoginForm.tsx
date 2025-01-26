// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Local Imports (components/types/utils)
import AnimatedView from '../components/AnimatedView';
import FormSubmitButton from '../components/FormSubmitButton';
import FormTextInputField from '../components/FormTextInputField';
import Flex from '../components/Flex';
import LinkButton from '../components/LinkButton';

// interface for LoginForm component
export interface LoginFormProps {
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
  loading?: boolean;
  showForgotPassword?: boolean;
}

export interface FormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
});

// functional component for LoginForm
function LoginForm(props: LoginFormProps) {
  // Destructuring props
  const { onSubmit, disabled, loading, showForgotPassword = true } = props;

  // render
  return (
    <AnimatedView style={styles.container}>
      <Formik<FormValues>
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

          {showForgotPassword ? (
            <Flex row align="flex-end" justify="flex-end" margins={{ top: 5, bottom: 5 }}>
              <LinkButton label="Forgot Password?" />
            </Flex>
          ) : null}

          <FormSubmitButton label="Log In" disabled={disabled} loading={loading} />
        </Flex>
      </Formik>
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
