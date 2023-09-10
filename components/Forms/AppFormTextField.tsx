// Packages Imports
import { useFormikContext } from "formik";

// Local Imports
import AnimatedView from "../Animated/AnimatedView";
import ErrorText from "../Text/ErrorText";
import TextFieldInput from "../Inputs/TextFieldInput";

// Named Imports
import { AppFormTextFieldProps } from "../../types/FormTypes";

// function component for AppFormTextField
function AppFormTextField(props: AppFormTextFieldProps) {
  // Destructure props
  const {
    title,
    customError,
    controlled,
    containerStyles = {},
    clearCustomError,
    ...otherProps
  } = props;

  // Formik Props
  const { touched, errors, setFieldTouched, handleChange, values } = useFormikContext<any>();

  // Get the field's current value
  const field_value = values[title]?.toString() ?? "";

  const errorValue: any = customError ? customError : touched[title] ? errors[title] : undefined;

  // Render
  return (
    <AnimatedView style={containerStyles}>
      <TextFieldInput
        onBlur={() => setFieldTouched(title)}
        onChangeText={text => {
          handleChange(title)(text);
          if (clearCustomError) clearCustomError();
        }}
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
export default AppFormTextField;
