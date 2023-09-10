// Packages Imports
import { useFormikContext } from "formik";

// Local Imports
import AnimatedView from "../Animated/AnimatedView";
import ErrorText from "../Text/ErrorText";
import PasswordInput from "../Inputs/PasswordInput";

// Named Imports
import { AppFormTextFieldProps } from "../../types/FormTypes";

// function component for AppFormPasswordField
function AppFormPasswordField(props: AppFormTextFieldProps) {
  // Destructure props
  const { title, customError, controlled, containerStyles = {}, ...otherProps } = props;

  // Formik Props
  const { touched, errors, setFieldTouched, handleChange, values } = useFormikContext<any>();

  // Get the field's current value
  const field_value = values[title]?.toString() ?? "";

  const errorValue: any = customError ? customError : touched[title] ? errors[title] : undefined;

  // Render
  return (
    <AnimatedView style={containerStyles}>
      <PasswordInput
        onBlur={() => setFieldTouched(title)}
        onChangeText={handleChange(title)}
        controlled={controlled}
        // If controlled is true, then add value to the input otherwise not.
        {...(controlled ? { value: field_value } : {})}
        {...otherProps}
      />
      <ErrorText error={errorValue} margins={{ left: 5, top: 5 }} />
    </AnimatedView>
  );
}

// Exports
export default AppFormPasswordField;
