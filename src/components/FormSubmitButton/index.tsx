// Packages Imports (from node_modules)
import { Keyboard } from 'react-native';
import { useFormikContext } from 'formik';

// Named Imports
import Button, { ButtonProps } from '../Button';

// interface for FormSubmitButton component
export interface FormSubmitButtonProps extends ButtonProps {
  /**
   * If true, dismisses the keyboard onPress
   */
  dismissKeyboardOnSubmit?: boolean;
}

// functional component for FormSubmitButton
function FormSubmitButton(props: FormSubmitButtonProps) {
  // Desctructuring props
  const { dismissKeyboardOnSubmit = true } = props;

  // useFormikContext hook
  const { handleSubmit, isSubmitting } = useFormikContext();

  const handleButtonPress = () => {
    if (isSubmitting) return;

    if (handleSubmit) handleSubmit();

    if (dismissKeyboardOnSubmit) Keyboard.dismiss();
  };

  // render
  return <Button onPress={handleButtonPress} loading={isSubmitting} {...props} />;
}

// exports
export default FormSubmitButton;
