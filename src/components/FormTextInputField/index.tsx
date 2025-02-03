// Packages Imports (from node_modules)
import { useFormikContext } from 'formik';

// Local Imports (components/types/utils)
import AppText from '../AppText';
import Flex from '../Flex';
import Input from '../Input';

// Named Imports
import { InputProps } from '../../types/components';

// interface for FormTextInputField component
export interface FormTextInputFieldProps extends InputProps {
  fieldName: string;
}

// functional component for FormTextInputField
function FormTextInputField(props: FormTextInputFieldProps) {
  // Destructuring props
  const { fieldName, controlled = false, ...restProps } = props;

  const { handleBlur, handleChange, touched, errors, values } = useFormikContext();

  // render
  return (
    <Flex layout={undefined}>
      <Input
        onChangeText={handleChange(fieldName)}
        onBlur={handleBlur(fieldName)}
        {...(controlled ? { value: values[fieldName] } : {})}
        controlled={controlled}
        {...restProps}
      />

      {touched[fieldName] && errors[fieldName] ? (
        <AppText text={errors[fieldName] as string} type="error" />
      ) : null}
    </Flex>
  );
}

// exports
export default FormTextInputField;
