// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { Field } from 'formik';

// Local Imports (components/types/utils)
import AppText from '../components/AppText';
import Flex from '../components/Flex';
import Form from '../components/Form';
import FormError from '../components/FormError';
import FormSubmitButton from '../components/FormSubmitButton';
import Icon from '../components/Icon';
import LinkButton from '../components/LinkButton';
import OTPInput from '../components/OTPInput';

// Named Imports
import { AppFormValues } from '../types/global';
import { fontFamilies } from '../constants/ui';
import { FormSubmitProps } from '../components/Form';

export interface FormValues extends AppFormValues {
  otp: string;
}

// interface for VerifyOTPForm component
export interface VerifyOTPFormProps extends FormSubmitProps<FormValues> {
  title?: string;
  subtitle?: string;
  onBackPress?: () => void;
}

const OTP_Schema = Yup.object().shape({
  otp: Yup.string().required('OTP is required').min(6, 'OTP must be 6 characters')
});

// functional component for VerifyOTPForm
function VerifyOTPForm(props: VerifyOTPFormProps) {
  // Destructuring props
  const {
    subtitle = 'A code has been sent to your email',
    title = 'Verify OTP',
    onBackPress,
    onSubmit
  } = props;

  // render
  return (
    <Flex style={styles.container}>
      <Icon family="AntDesign" name="arrowleft" size={32} onPress={onBackPress} />

      <Flex gap={24}>
        <Flex gap={12} justify="center" align="center" margins={{ top: 16, bottom: 16 }}>
          <AppText
            text={title}
            size={30}
            family={fontFamilies.Poppins.medium}
            style={{ textAlign: 'center' }}
          />

          <AppText text={subtitle} size={14} style={{ textAlign: 'center' }} />
        </Flex>

        <Form onSubmit={onSubmit} initialValues={{ otp: '' }} validationSchema={OTP_Schema}>
          <Flex gap={24}>
            <Field name="otp">
              {({ field, meta, form }) => (
                <Flex>
                  <OTPInput
                    onChangeText={(text) => form.setFieldValue('otp', text)}
                    value={field.value}
                  />

                  {meta.touched && meta.error && (
                    <AppText
                      text={meta.error}
                      type="error"
                      style={{ textAlign: 'center', marginTop: 12 }}
                    />
                  )}
                </Flex>
              )}
            </Field>

            <FormError />

            <Flex row gap={8} align="center" justify="center" layout={undefined}>
              <AppText text="Didn't recieve a code?" layout={undefined} />
              <LinkButton label="Resend code" />
            </Flex>

            <FormSubmitButton label="Verify OTP" />
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
}

// exports
export default VerifyOTPForm;

// styles for VerifyOTPForm
const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});
