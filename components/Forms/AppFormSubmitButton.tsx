// Packages Imports
import { useFormikContext } from "formik";
import { Pressable } from "react-native";

// Component/Types imports
import { AppFormSubmitButtonProps } from "../../types/FormTypes";
import AppButton from "../App/AppButton";

// function component for AppFormSubmitButton
function AppFormSubmitButton(props: AppFormSubmitButtonProps) {
  // Formik context
  const { handleSubmit } = useFormikContext();

  // Destructure props
  const { custom, onPress, shouldTranslate = false, ...otherProps } = props;

  // Render
  return custom ? (
    <Pressable onPress={onPress ? onPress : handleSubmit}>{custom}</Pressable>
  ) : (
    <AppButton onPress={onPress ? onPress : handleSubmit} {...otherProps} />
  );
}

// exports
export default AppFormSubmitButton;
