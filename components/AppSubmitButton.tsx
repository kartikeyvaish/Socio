// Packages Imports
import { useFormikContext } from "formik";

// Component/Types imports
import AppButton from "./AppButton";
import { AppSubmitButtonProps } from "../types/ComponentTypes";

// function component for AppSubmitButton
function AppSubmitButton(props: AppSubmitButtonProps) {
  // Formik context
  const { handleSubmit } = useFormikContext();

  // Destructure props
  const { CustomButton, onPress, ...otherProps } = props;

  // Render
  return CustomButton ? (
    <CustomButton onPress={onPress ? onPress : handleSubmit} />
  ) : (
    <AppButton onPress={onPress ? onPress : handleSubmit} {...otherProps} />
  );
}

// exports
export default AppSubmitButton;
